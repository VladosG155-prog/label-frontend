import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';
import { genres } from '@/constants/genres';

function buildTree(list) {
    const map = {};
    list.forEach((item) => (map[item.genreId] = { ...item, children: [] }));
    const roots = [];
    list.forEach((item) => {
        if (item.parentId === null) {
            roots.push(map[item.genreId]);
        } else if (map[item.parentId]) {
            map[item.parentId].children.push(map[item.genreId]);
        }
    });
    return roots;
}

export default function GenreSelect() {
    const treeData = useMemo(() => buildTree(genres), []);
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    const handleSelect = (id) => {
        setSelected(id);
        setOpen(false);
    };

    const renderTree = (nodes, level = 0) =>
        nodes.map((node) => (
            <div key={node.genreId}>
                <button
                    type="button"
                    className="flex w-full text-left px-2 py-1 hover:bg-accent hover:text-accent-foreground"
                    style={{ marginLeft: level * 12 }}
                    onClick={() => handleSelect(node.genreId)}
                >
                    {node.genreName}
                </button>
                {node.children.length > 0 && renderTree(node.children, level + 1)}
            </div>
        ));

    const selectedName = genres.find((g) => g.genreId === selected)?.genreName || 'Выберите жанр';

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-64 justify-between">
                    {selectedName}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 max-h-96 overflow-y-auto p-0">{renderTree(treeData)}</PopoverContent>
        </Popover>
    );
}
