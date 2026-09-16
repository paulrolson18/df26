import { Component } from '@/lib/decorators/component';
import { AttributeDefinition } from '@/lib/decorators/attribute-definition';
import { RegionDefinition } from '@/lib/decorators';

@Component('trustBadge', { name: 'Trust Badge', group: 'Content' })
@RegionDefinition([])
export class TrustBadgeMetadata {
  @AttributeDefinition({ name: 'Label', type: 'string' })
  label!: string;

  @AttributeDefinition({ name: 'Icon Name', type: 'string', required: false })
  iconName?: string;
}

interface TrustBadgeProps {
  label: string;
  iconName?: string;
}

export default function TrustBadge({ label, iconName }: TrustBadgeProps) {
  if (!label) return null;
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-4 text-lg font-bold text-white bg-green-600 border-4 border-green-800">
      {iconName && <span>✅</span>}
      <span>{label}</span>
    </div>
  );
}

export function TrustBadgeFallback() {
  return <div className="h-8 bg-muted animate-pulse" />;
}
export { TrustBadgeFallback as fallback };