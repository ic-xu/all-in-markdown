import React from "react";


interface MathPluginSettings {
    defaultDelimiter: 'dollars' | 'brackets';
    autoNumbering: boolean;
}

export const MathSettings: React.FC<{
    settings: MathPluginSettings;
    onUpdate: (settings: MathPluginSettings) => void;
}> = ({ settings, onUpdate }) => {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Default Delimiter</label>
                <select
                    value={settings.defaultDelimiter}
                    onChange={(e) => onUpdate({ ...settings, defaultDelimiter: e.target.value as 'dollars' | 'brackets' })}
                    className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800"
                >
                    <option value="dollars">Dollars ($$...$$)</option>
                    <option value="brackets">Brackets (\[...\])</option>
                </select>
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="autoNumbering"
                    checked={settings.autoNumbering}
                    onChange={(e) => onUpdate({ ...settings, autoNumbering: e.target.checked })}
                    className="rounded border-gray-300 dark:border-gray-700"
                />
                <label htmlFor="autoNumbering" className="text-sm">
                    Enable equation auto-numbering
                </label>
            </div>
        </div>
    );
};