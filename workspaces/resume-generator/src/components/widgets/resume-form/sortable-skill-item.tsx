import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SortableSkillItemProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export function SortableSkillItem({ id, value, onChange, onRemove }: SortableSkillItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 rounded shadow p-2 text-white"
    >
      <span
        className="cursor-grab select-none pr-2 text-gray-300 text-xl"
        aria-label="Drag handle"
        {...attributes}
        {...listeners}
      >
        ☰
      </span>
      <Input
        value={value}
        onChange={onChange}
        placeholder="Skill"
        className="bg-black text-white border-white focus-visible:border-white focus-visible:ring-white/50"
      />
      <Button type="button" variant="destructive" onClick={onRemove}>
        Remove
      </Button>
    </div>
  );
} 