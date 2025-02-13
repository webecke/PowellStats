import './LakeSystemConfig.css';
import {LakeSystemFeatures, LakeSystemStatus} from "../../../services/data";

interface LakeSystemConfigProps {
    config: LakeSystemStatus;
    onChange: (newConfig: LakeSystemStatus) => void;
}

export default function LakeSystemConfig({ config, onChange }: LakeSystemConfigProps) {
    const handleChange = (field: keyof LakeSystemStatus, value: any) => {
        onChange({
            ...config,
            [field]: value
        });
    };

    const handleFeatureToggle = (feature: LakeSystemFeatures) => {
        const newFeatures = config.features.includes(feature)
            ? config.features.filter(f => f !== feature)
            : [...config.features, feature];

        handleChange('features', newFeatures);
    };

    // Helper to convert enum values to display text
    const formatFeatureName = (feature: string): string => {
        return feature.split('_')
            .map(word => word.charAt(0) + word.slice(1).toLowerCase())
            .join(' ');
    };

    return (
        <div className="lake-system-config">
            <div className="lake-system-config__grid">
                <h3>System Configuration</h3>

                <div className="lake-system-config__names-grid">
                    <div className="lake-system-config__field">
                        <label className="lake-system-config__label" htmlFor="lakeName">
                            Lake Name
                        </label>
                        <input
                            id="lakeName"
                            className="lake-system-config__input"
                            value={config.lakeName}
                            onChange={(e) => handleChange('lakeName', e.target.value)}
                        />
                    </div>

                    <div className="lake-system-config__field">
                        <label className="lake-system-config__label" htmlFor="brandedName">
                            Branded Name
                        </label>
                        <input
                            id="brandedName"
                            className="lake-system-config__input"
                            value={config.brandedName}
                            onChange={(e) => handleChange('brandedName', e.target.value)}
                        />
                    </div>
                </div>

                <div className="lake-system-config__field">
                    <label className="lake-system-config__label">System Status</label>
                    <select
                        className="lake-system-config__select"
                        value={config.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                    >
                        <option value="ENABLED">Enabled</option>
                        <option value="DISABLED">Disabled</option>
                        <option value="TESTING">Testing</option>
                    </select>
                </div>

                <div className="lake-system-config__field">
                    <label className="lake-system-config__label">Features</label>
                    <div className="lake-system-config__features-list">
                        {Object.values(LakeSystemFeatures).map(feature => (
                            <div key={feature} className="lake-system-config__checkbox-group">
                                <input
                                    type="checkbox"
                                    id={feature}
                                    className="lake-system-config__checkbox"
                                    checked={config.features.includes(feature)}
                                    onChange={() => handleFeatureToggle(feature)}
                                />
                                <label
                                    htmlFor={feature}
                                    className="lake-system-config__feature-label"
                                >
                                    {formatFeatureName(feature)}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
