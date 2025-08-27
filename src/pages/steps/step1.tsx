import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GenreSelect from '@/components/ui/genre-select';

export default function InfoRelease() {
    const [step, setStep] = useState(0);

    const [formData, setFormData] = useState({
        releaseType: '',
        cover: null,
        mainArtist: '',
        additionalArtists: '',
        featuringArtists: '',
        releaseTitle: '',
        version: '',
        label: '',
        pline: '',
        cline: '',
        releaseDate: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSelectChange = (name) => (value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-6">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Release Information Section */}
                <Card className="bg-gray-800 border-gray-700 rounded-2xl shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl text-gray-200">Информация о релизе</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-wrap gap-4">
                            {/* Release Type */}
                            <div className="flex-1 min-w-[200px] space-y-2">
                                <Label htmlFor="releaseType" className="text-sm font-semibold text-gray-200">
                                    Тип релиза
                                </Label>
                                <Select name="releaseType" value={formData.releaseType} onValueChange={handleSelectChange('releaseType')}>
                                    <SelectTrigger
                                        id="releaseType"
                                        className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <SelectValue placeholder="Выберите тип" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 text-gray-200 border-gray-600">
                                        <SelectItem value="single">Сингл</SelectItem>
                                        <SelectItem value="ep">EP / Альбом</SelectItem>
                                        <SelectItem value="tiktok">TikTok звук</SelectItem>
                                        <SelectItem value="video">Клип</SelectItem>
                                        <SelectItem value="ringtone">Рингтон</SelectItem>
                                        <SelectItem value="podcast">Подкаст</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Cover Image */}
                            <div className="flex-1 min-w-[200px] space-y-2">
                                <Label htmlFor="cover" className="text-sm font-semibold text-gray-200">
                                    Обложка (JPG/PNG)
                                </Label>
                                <Input
                                    id="cover"
                                    type="file"
                                    name="cover"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-700 file:text-gray-200 file:text-sm file:font-medium hover:file:bg-gray-600"
                                />
                            </div>
                        </div>

                        {/* Main Artist */}
                        <div className="space-y-2">
                            <Label htmlFor="mainArtist" className="text-sm font-semibold text-gray-200">
                                Основной исполнитель
                            </Label>
                            <Input
                                id="mainArtist"
                                type="text"
                                name="mainArtist"
                                value={formData.mainArtist}
                                onChange={handleChange}
                                placeholder="Введите имя основного исполнителя"
                                className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <GenreSelect />
                        {/* Additional Artists */}
                        <div className="space-y-2">
                            <Label htmlFor="additionalArtists" className="text-sm font-semibold text-gray-200">
                                Дополнительные исполнители
                            </Label>
                            <Input
                                id="additionalArtists"
                                type="text"
                                name="additionalArtists"
                                value={formData.additionalArtists}
                                onChange={handleChange}
                                placeholder="Введите дополнительных исполнителей"
                                className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Featuring Artists */}
                        <div className="space-y-2">
                            <Label htmlFor="featuringArtists" className="text-sm font-semibold text-gray-200">
                                Featuring
                            </Label>
                            <Input
                                id="featuringArtists"
                                type="text"
                                name="featuringArtists"
                                value={formData.featuringArtists}
                                onChange={handleChange}
                                placeholder="Введите исполнителей для фичеринга"
                                className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Release Title */}
                        <div className="space-y-2">
                            <Label htmlFor="releaseTitle" className="text-sm font-semibold text-gray-200">
                                Название релиза
                            </Label>
                            <Input
                                id="releaseTitle"
                                type="text"
                                name="releaseTitle"
                                value={formData.releaseTitle}
                                onChange={handleChange}
                                placeholder="Введите название релиза"
                                className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Version */}
                        <div className="space-y-2">
                            <Label htmlFor="version" className="text-sm font-semibold text-gray-200">
                                Версия
                            </Label>
                            <Input
                                id="version"
                                type="text"
                                name="version"
                                value={formData.version}
                                onChange={handleChange}
                                placeholder="Введите версию релиза"
                                className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Release Date */}
                        <div className="space-y-2">
                            <Label htmlFor="releaseDate" className="text-sm font-semibold text-gray-200">
                                Дата релиза
                            </Label>
                            <Input
                                id="releaseDate"
                                type="date"
                                name="releaseDate"
                                value={formData.releaseDate}
                                onChange={handleChange}
                                className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
                        >
                            Отправить
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
