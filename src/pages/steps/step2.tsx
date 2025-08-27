import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Copy, X, Upload, Music } from 'lucide-react';

const years = Array.from({ length: 126 }, (_, i) => (2025 - i).toString());
const languages = [
    'Русский',
    'Английский',
    'Испанский',
    'Французский',
    'Немецкий',
    'Итальянский',
    'Азербайджанский',
    'Албанский',
    'Арабский',
    'Армянский',
    'Баскский',
    'Белорусский'
    // Add more languages as needed
];

export default function TrackUploadForm() {
    const [isSingleTrack, setIsSingleTrack] = useState(false);
    const [hasExplicitContent, setHasExplicitContent] = useState(false);
    const [isInstrumental, setIsInstrumental] = useState(false);
    const [hasISRC, setHasISRC] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleClick = () => {
        inputRef.current?.click();
    };
    return (
        <div className="bg-gray-900 text-white min-h-screen p-6">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Track Upload Section */}
                <Card className="bg-gray-800 border-gray-700 rounded-2xl shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl text-gray-200">Загрузка трека</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="track-upload" className="text-sm font-semibold text-gray-200">
                                Загрузите трек <span className="text-red-400">*</span>
                            </Label>
                            <div
                                className="border-2 border-dashed border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500"
                                onClick={handleClick}
                            >
                                <Input
                                    id="track-upload"
                                    type="file"
                                    accept="audio/wav, audio/x-wav"
                                    className="hidden"
                                    ref={inputRef}
                                    onChange={handleFileChange}
                                />
                                <Upload className="h-6 w-6 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-400">
                                    {file ? `Выбран файл: ${file.name}` : 'Выберите или перетащите файл'}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="explicit-content"
                                    checked={hasExplicitContent}
                                    onCheckedChange={setHasExplicitContent}
                                    className="data-[state=checked]:bg-blue-500"
                                />
                                <Label htmlFor="explicit-content" className="text-gray-200">
                                    Ненормативная лексика
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="instrumental"
                                    checked={isInstrumental}
                                    onCheckedChange={setIsInstrumental}
                                    className="data-[state=checked]:bg-blue-500"
                                />
                                <Label htmlFor="instrumental" className="text-gray-200">
                                    Инструментальная музыка
                                </Label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Track Information Section */}
                <Card className="bg-gray-800 border-gray-700 rounded-2xl shadow-lg">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-2xl text-gray-200">Информация о треке</CardTitle>
                            <Button variant="ghost" className="text-gray-400 hover:text-gray-200">
                                <Copy className="h-4 w-4 mr-2" />
                                Скопировать данные
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="single-track"
                                checked={isSingleTrack}
                                onCheckedChange={setIsSingleTrack}
                                className="data-[state=checked]:bg-blue-500"
                            />
                            <Label htmlFor="single-track" className="text-gray-200">
                                Релиз с одним треком
                            </Label>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-4">
                                <div className="flex-1 min-w-[200px] space-y-2">
                                    <Label htmlFor="main-artist" className="text-sm font-semibold text-gray-200">
                                        Исполнитель <span className="text-red-400">*</span>
                                    </Label>
                                    <div className="flex space-x-2">
                                        <Input
                                            id="main-artist"
                                            placeholder="Введите основного исполнителя"
                                            className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-200">
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-200">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex-1 min-w-[200px] space-y-2">
                                    <Label htmlFor="additional-artist" className="text-sm font-semibold text-gray-200">
                                        Дополнительный исполнитель
                                    </Label>
                                    <div className="flex space-x-2">
                                        <Input
                                            id="additional-artist"
                                            placeholder="Введите доп. исполнителя"
                                            className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-200">
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-200">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="feat-artist" className="text-sm font-semibold text-gray-200">
                                    При участии (feat.)
                                </Label>
                                <div className="flex space-x-2">
                                    <Input
                                        id="feat-artist"
                                        placeholder="Введите feat. исполнителя"
                                        className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-200">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-200">
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="track-title" className="text-sm font-semibold text-gray-200">
                                    Название трека <span className="text-red-400">*</span>
                                </Label>
                                <Input
                                    id="track-title"
                                    placeholder="Введите название трека"
                                    className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="track-version" className="text-sm font-semibold text-gray-200">
                                    Версия трека
                                </Label>
                                <Input
                                    id="track-version"
                                    placeholder="Введите версию трека"
                                    className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <div className="flex-1 min-w-[200px] space-y-2">
                                    <Label htmlFor="record-year" className="text-sm font-semibold text-gray-200">
                                        Год записи трека <span className="text-red-400">*</span>
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                                            <SelectValue placeholder="Введите год записи" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 text-gray-200 border-gray-600">
                                            {years.map((year) => (
                                                <SelectItem key={year} value={year}>
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex-1 min-w-[200px] space-y-2">
                                    <Label htmlFor="track-language" className="text-sm font-semibold text-gray-200">
                                        Язык трека <span className="text-red-400">*</span>
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                                            <SelectValue placeholder="Язык трека" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 text-gray-200 border-gray-600">
                                            {languages.map((lang) => (
                                                <SelectItem key={lang} value={lang}>
                                                    {lang}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="music-author" className="text-sm font-semibold text-gray-200">
                                    Автор музыки <span className="text-red-400">*</span>
                                </Label>
                                <div className="flex space-x-2">
                                    <Input
                                        id="music-author"
                                        placeholder="Введите автора музыки (ФИО)"
                                        className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-200">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-200">
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lyric-author" className="text-sm font-semibold text-gray-200">
                                    Автор слов <span className="text-red-400">*</span>
                                </Label>
                                <div className="flex space-x-2">
                                    <Input
                                        id="lyric-author"
                                        placeholder="Введите автора слов (ФИО)"
                                        className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-200">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-200">
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <div className="flex-1 min-w-[200px] space-y-2">
                                    <Label htmlFor="genre" className="text-sm font-semibold text-gray-200">
                                        Жанр трека <span className="text-red-400">*</span>
                                    </Label>
                                    <Input
                                        id="genre"
                                        placeholder="Выберите жанр"
                                        className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex-1 min-w-[200px] space-y-2">
                                    <Label htmlFor="additional-genres" className="text-sm font-semibold text-gray-200">
                                        Дополнительные жанры <span className="text-sm text-gray-400">0 / 3 жанры</span>
                                    </Label>
                                    <Input
                                        id="additional-genres"
                                        placeholder="Выберите жанр"
                                        className="w-full bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="isrc"
                                    checked={hasISRC}
                                    onCheckedChange={setHasISRC}
                                    className="data-[state=checked]:bg-blue-500"
                                />
                                <Label htmlFor="isrc" className="text-gray-200">
                                    У меня есть свой ISRC
                                </Label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Track Lyrics Section */}
                <Card className="bg-gray-800 border-gray-700 rounded-2xl shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl text-gray-200">Текст трека</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label htmlFor="lyrics" className="text-sm font-semibold text-gray-200">
                                Введите текст трека
                            </Label>
                            <Textarea
                                id="lyrics"
                                className="min-h-[150px] bg-gray-800 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Add Track Section */}
                <Card className="bg-gray-800 border-gray-700 rounded-2xl shadow-lg">
                    <CardHeader>
                        <div className="flex items-center space-x-2">
                            <CardTitle className="text-2xl text-gray-200">Добавить трек</CardTitle>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-200">
                                <Plus className="h-6 w-6" />
                            </Button>
                        </div>
                    </CardHeader>
                </Card>

                {/* Cover Preview Section */}
                <Card className="bg-gray-800 border-gray-700 rounded-2xl shadow-lg sticky top-4 max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl text-gray-200">Обложка сингла</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            <Music className="absolute top-2 left-2 h-6 w-6 text-gray-400" />
                            <img src="/img/default_cover.a4708650.png" alt="Cover" className="w-full h-auto rounded-lg" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
