import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

// 🔹 импортируем хук
import { useCreateArtist } from '@/hooks/useCreateArtistMutation';

interface Artist {
    id: string;
    username: string;
}

interface ArtistSelectProps {
    artists: Artist[];
    onSelect: (artist: Artist) => void;
    isMulti: boolean;
}

const BASE_FIELDS = [
    { label: 'Аккаунт TG', name: 'username', type: 'text' },
    { label: 'Псевдоним', name: 'nickname', type: 'text' },
    { label: 'Имя', name: 'firstname', type: 'text' },
    { label: 'Фамилия', name: 'lastname', type: 'text' },
    { label: 'Отчество', name: 'surname', type: 'text' },
    { label: 'Адрес регистрации', name: 'adress', type: 'text' },
    { label: 'Почтовый адрес', name: 'postadress', type: 'text' },
    { label: 'Номер телефона', name: 'phone', type: 'text' },
    { label: 'Возраст', name: 'age', type: 'number' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Spotify', name: 'spotify' },
    { label: 'Яндекс.Музыка', name: 'yandex' },
    { label: 'SoundCloud', name: 'soundcloud' },
    { label: 'VK Music', name: 'vk' },
    { label: 'Apple Music', name: 'appleMusic' },
    { label: 'Наименование банка', name: 'bankname', type: 'text' },
    { label: 'БИК', name: 'bik', type: 'text' },
    { label: 'Номер расчетного счета', name: 'rsnumber', type: 'text' },
    { label: 'Номер корреспондентского счета', name: 'ksnumber', type: 'text' }
];

export default function ArtistSelect({ artists, onSelect, isMulti }: ArtistSelectProps) {
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selected, setSelected] = useState<Artist | null>(null);
    const [query, setQuery] = useState('');
    const [form, setForm] = useState<Record<string, string>>({});
    const [isForeign, setIsForeign] = useState(false);

    // 🔹 используем хук
    const createArtist = useCreateArtist();

    const filtered = artists?.filter((a) => a.username.toLowerCase().includes(query.toLowerCase()));

    const handleSelect = (artist: Artist) => {
        if (!isMulti) {
            setSelected(artist);
        }
        onSelect(artist);
        setOpen(false);
    };

    const handleFormChange = (name: string, value: string) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!form.username) return; // проверим хотя бы username

        createArtist.mutate(form, {
            onSuccess: (newArtist) => {
                if (!isMulti) {
                    setSelected(newArtist);
                }
                onSelect(newArtist);
                setModalOpen(false);
                setForm({});
                setIsForeign(false);
            },
            onError: (err) => {
                console.error(err);
                alert('Ошибка при создании артиста');
            }
        });
    };

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[250px] justify-between bg-gray-950 text-gray-100 border border-gray-800 hover:bg-gray-900 hover:text-white"
                    >
                        {selected ? selected.username : 'Выберите артиста'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-70" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0 bg-gray-950 text-gray-100 border border-gray-800">
                    <Command className="bg-gray-950 text-gray-100">
                        <CommandInput
                            placeholder="Поиск артиста..."
                            value={query}
                            onValueChange={setQuery}
                            className="bg-gray-950 text-gray-100 placeholder-gray-400"
                        />
                        <CommandEmpty className="px-3 py-2 text-gray-400">Не найдено</CommandEmpty>
                        <CommandGroup>
                            {filtered.map((artist) => (
                                <CommandItem
                                    key={artist.id}
                                    onSelect={() => handleSelect(artist)}
                                    className="cursor-pointer hover:bg-gray-800 text-gray-100"
                                >
                                    {artist.username}
                                    {selected?.id === artist.id && <Check className="ml-auto h-4 w-4 text-green-400" />}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        <div className="border-t border-gray-800 p-2">
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-gray-100 hover:bg-gray-800 hover:text-white"
                                onClick={() => {
                                    setOpen(false);
                                    setModalOpen(true);
                                }}
                            >
                                <Plus className="mr-2 h-4 w-4" /> Добавить артиста
                            </Button>
                        </div>
                    </Command>
                </PopoverContent>
            </Popover>

            {/* Модалка */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="sm:max-w-[900px] bg-gray-950 text-gray-100 border border-gray-800">
                    <DialogHeader>
                        <DialogTitle>Добавить артиста</DialogTitle>
                    </DialogHeader>

                    {/* 🔹 переключатель */}
                    <div className="flex items-center gap-3 mb-4">
                        <Switch checked={isForeign} onCheckedChange={setIsForeign} />
                        <Label>Иностранец</Label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
                        {BASE_FIELDS.map((field) => (
                            <div key={field.name} className="flex flex-col gap-2">
                                <Label htmlFor={field.name}>{field.label}</Label>
                                <Input
                                    id={field.name}
                                    type={field.type || 'text'}
                                    value={form[field.name] || ''}
                                    onChange={(e) => handleFormChange(field.name, e.target.value)}
                                    className="bg-gray-900 border-gray-800 text-gray-100"
                                />
                            </div>
                        ))}

                        {/* 🔹 условное поле */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor={isForeign ? 'documentInfo' : 'INN'}>{isForeign ? 'Информация о документе' : 'ИНН'}</Label>
                            <Input
                                id={isForeign ? 'documentInfo' : 'INN'}
                                type="text"
                                value={form[isForeign ? 'documentInfo' : 'INN'] || ''}
                                onChange={(e) => handleFormChange(isForeign ? 'documentInfo' : 'INN', e.target.value)}
                                className="bg-gray-900 border-gray-800 text-gray-100"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button onClick={() => setModalOpen(false)} variant="ghost" className="border border-gray-800">
                            Отмена
                        </Button>
                        <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700" disabled={createArtist.isPending}>
                            {createArtist.isPending ? 'Сохраняем...' : 'Сохранить'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
