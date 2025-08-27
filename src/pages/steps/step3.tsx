import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle } from 'lucide-react';
import { PLATFORMS_LIST } from '@/constants/platforms';

const ugcPlatformsList = [
    { id: 501, name: 'YouTubeContentID', publicName: 'YouTube Content ID' },
    { id: 502, name: 'TikTokFingerprinting', publicName: 'TikTok Fingerprinting' },
    { id: 503, name: 'SoundCloud', publicName: 'SoundCloud' },
    { id: 504, name: 'MusixMatch', publicName: 'MusixMatch' },
    { id: 505, name: 'FacebookInstagram', publicName: 'Facebook/Instagram' },
    { id: 506, name: 'FacebookFingerprinting', publicName: 'Facebook Fingerprinting' }
];

export default function DistributionPlatforms() {
    const [distributionType, setDistributionType] = useState('selected');

    const [platforms, setPlatforms] = useState(PLATFORMS_LIST.map((p) => ({ ...p, selected: true })));
    const [ugcPlatforms, setUgcPlatforms] = useState(ugcPlatformsList.map((p) => ({ ...p, selected: true })));

    const [selectAll, setSelectAll] = useState(true);
    const [selectAllUGC, setSelectAllUGC] = useState(true);

    const handleSelectAll = () => {
        const newValue = !selectAll;
        setSelectAll(newValue);
        setPlatforms((prev) => prev.map((p) => ({ ...p, selected: newValue })));
    };

    const handleSelectAllUGC = () => {
        const newValue = !selectAllUGC;
        setSelectAllUGC(newValue);
        setUgcPlatforms((prev) => prev.map((p) => ({ ...p, selected: newValue })));
    };

    const handlePlatformChange = (id: number) => {
        setPlatforms((prev) => prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p)));
    };

    const handleUgcPlatformChange = (id: number) => {
        setUgcPlatforms((prev) => prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p)));
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-6">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Distribution Platforms Section */}
                <Card className="bg-gray-800 border-gray-700 rounded-2xl shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl text-gray-200">Платформы распространения</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="distributionType" className="text-sm font-semibold text-gray-200">
                                Выберите страны распространения
                            </Label>
                            <Select value={distributionType} onValueChange={setDistributionType}>
                                <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                                    <SelectValue placeholder="Выберите тип" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 text-gray-200 border-gray-600">
                                    <SelectItem value="all">На всех платформах</SelectItem>
                                    <SelectItem value="selected">Только на некоторых платформах</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="select-all"
                                    checked={selectAll}
                                    onCheckedChange={handleSelectAll}
                                    className="border-gray-600 data-[state=checked]:bg-blue-500"
                                />
                                <Label htmlFor="select-all" className="text-gray-200">
                                    Выбрать все
                                </Label>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {platforms.map((platform) => (
                                    <div key={platform.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`platform-${platform.id}`}
                                            checked={platform.selected}
                                            onCheckedChange={() => handlePlatformChange(platform.id)}
                                            className="border-gray-600 data-[state=checked]:bg-blue-500"
                                        />
                                        <Label htmlFor={`platform-${platform.id}`} className="text-gray-200">
                                            {platform.publicName}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* UGC Platforms Section */}
                <Card className="bg-gray-800 border-gray-700 rounded-2xl shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl text-gray-200">UGC платформы</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="select-all-ugc"
                                    checked={selectAllUGC}
                                    onCheckedChange={handleSelectAllUGC}
                                    className="border-gray-600 data-[state=checked]:bg-blue-500"
                                />
                                <Label htmlFor="select-all-ugc" className="text-gray-200">
                                    Выбрать все
                                </Label>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {ugcPlatforms.map((platform) => (
                                    <div key={platform.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`ugc-platform-${platform.id}`}
                                            checked={platform.selected}
                                            onCheckedChange={() => handleUgcPlatformChange(platform.id)}
                                            className="border-gray-600 data-[state=checked]:bg-blue-500"
                                        />
                                        <Label htmlFor={`ugc-platform-${platform.id}`} className="text-gray-200">
                                            {platform.publicName}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
