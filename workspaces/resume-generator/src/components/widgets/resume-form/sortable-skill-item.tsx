import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SkillType } from '@nevmstas/hygraph-client';

interface SortableSkillItemProps {
  id: string;
  value: string;
  type: SkillType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTypeChange: (value: SkillType) => void;
  onRemove: () => void;
}

export function SortableSkillItem({ id, value, type, onChange, onTypeChange, onRemove }: SortableSkillItemProps) {
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
      <Select value={type} onValueChange={(val) => onTypeChange(val as SkillType)}>
        <SelectTrigger className="bg-black text-white border-white w-40">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(SkillType).map((skillType) => (
            <SelectItem key={skillType} value={skillType}>
              {skillType}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="button" variant="destructive" onClick={onRemove}>
        Remove
      </Button>
    </div>
  );
} 