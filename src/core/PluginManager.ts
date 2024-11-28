import { EventEmitter } from 'eventemitter3';
import type { Plugin, PluginContext, Command, MarkdownRenderer, Theme, ToolbarItem } from '../types/plugin';

export class PluginManager {
  private plugins: Map<string, Plugin> = new Map();
  private activePlugins: Set<string> = new Set();
  private commands: Map<string, Command> = new Map();
  private renderers: Map<string, MarkdownRenderer> = new Map();
  private themes: Map<string, Theme> = new Map();
  private toolbarItems: Map<string, ToolbarItem> = new Map();
  private eventBus: EventEmitter;

  constructor() {
    this.eventBus = new EventEmitter();
  }

  private createContext(pluginId: string): PluginContext {
    return {
      eventBus: this.eventBus,
      registerCommand: (command: Command) => this.registerCommand(pluginId, command),
      registerRenderer: (renderer: MarkdownRenderer) => this.registerRenderer(pluginId, renderer),
      registerTheme: (theme: Theme) => this.registerTheme(pluginId, theme),
      registerToolbarItem: (item: ToolbarItem) => this.registerToolbarItem(pluginId, item),
    };
  }

  async installPlugin(plugin: Plugin): Promise<void> {
    if (this.plugins.has(plugin.id)) {
      throw new Error(`Plugin ${plugin.id} is already installed`);
    }

    this.plugins.set(plugin.id, plugin);
    await this.activatePlugin(plugin.id);
  }

  async activatePlugin(pluginId: string): Promise<void> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin ${pluginId} is not installed`);
    }

    if (this.activePlugins.has(pluginId)) {
      return;
    }

    const context = this.createContext(pluginId);
    await plugin.onActivate?.(context);
    this.activePlugins.add(pluginId);
    this.eventBus.emit('plugin:activated', pluginId);
  }

  async deactivatePlugin(pluginId: string): Promise<void> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin || !this.activePlugins.has(pluginId)) {
      return;
    }

    const context = this.createContext(pluginId);
    await plugin.onDeactivate?.(context);
    this.activePlugins.delete(pluginId);
    this.cleanupPluginRegistrations(pluginId);
    this.eventBus.emit('plugin:deactivated', pluginId);
  }

  async togglePlugin(pluginId: string): Promise<void> {
    if (this.activePlugins.has(pluginId)) {
      await this.deactivatePlugin(pluginId);
    } else {
      await this.activatePlugin(pluginId);
    }
  }

  isPluginActive(pluginId: string): boolean {
    return this.activePlugins.has(pluginId);
  }

  getPlugins(): [string, Plugin][] {
    return Array.from(this.plugins.entries());
  }

  private registerCommand(pluginId: string, command: Command): void {
    this.commands.set(`${pluginId}:${command.id}`, command);
  }

  private registerRenderer(pluginId: string, renderer: MarkdownRenderer): void {
    this.renderers.set(`${pluginId}:${renderer.id}`, renderer);
  }

  private registerTheme(pluginId: string, theme: Theme): void {
    this.themes.set(`${pluginId}:${theme.id}`, theme);
  }

  private registerToolbarItem(pluginId: string, item: ToolbarItem): void {
    this.toolbarItems.set(`${pluginId}:${item.id}`, item);
  }

  private cleanupPluginRegistrations(pluginId: string): void {
    const removeByPrefix = (map: Map<string, any>) => {
      for (const key of map.keys()) {
        if (key.startsWith(`${pluginId}:`)) {
          map.delete(key);
        }
      }
    };

    removeByPrefix(this.commands);
    removeByPrefix(this.renderers);
    removeByPrefix(this.themes);
    removeByPrefix(this.toolbarItems);
  }

  getCommands(): Command[] {
    return Array.from(this.commands.values());
  }

  getRenderers(): MarkdownRenderer[] {
    return Array.from(this.renderers.values());
  }

  getThemes(): Theme[] {
    return Array.from(this.themes.values());
  }

  getToolbarItems(): ToolbarItem[] {
    return Array.from(this.toolbarItems.values());
  }

  getEventBus(): EventEmitter {
    return this.eventBus;
  }
}