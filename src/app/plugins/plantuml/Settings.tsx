import React from 'react';

interface PlantUMLPluginSettings {
    serverUrl: string;
}

const PlantUMLSettings: React.FC<{
    settings: PlantUMLPluginSettings;
    onUpdate: (settings: PlantUMLPluginSettings) => void;
}> = ({ settings, onUpdate }) => {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">PlantUML Server URL</label>
                <input
                    type="text"
                    value={settings.serverUrl}
                    onChange={(e) => onUpdate({ ...settings, serverUrl: e.target.value })}
                    className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800"
                    placeholder="https://www.plantuml.com/plantuml/svg"
                />
            </div>
        </div>
    );
};

export default PlantUMLSettings;