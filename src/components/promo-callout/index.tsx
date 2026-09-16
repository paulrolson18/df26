/**
 * Copyright 2026 Salesforce, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Component } from '@/lib/decorators/component';
import { AttributeDefinition } from '@/lib/decorators/attribute-definition';

@Component('promoCallout', { name: 'Promo Callout', group: 'Content' })
export class PromoCalloutMetadata {
    @AttributeDefinition({ name: 'Message', type: 'string' })
    message!: string;

    @AttributeDefinition({
        name: 'Style',
        type: 'enum',
        values: ['default', 'accent'],
        defaultValue: 'default',
    })
    variant?: 'default' | 'accent';
}

interface PromoCalloutProps {
    message: string;
    variant?: 'default' | 'accent';
}

export default function PromoCallout({ message, variant = 'default' }: PromoCalloutProps) {
    if (!message) return null;
    return (
        <div
            className={
                variant === 'accent'
                    ? 'bg-primary text-primary-foreground px-6 py-4 text-center font-medium'
                    : 'bg-muted text-foreground px-6 py-4 text-center font-medium'
            }>
            {message}
        </div>
    );
}

export function PromoCalloutFallback() {
    return <div className="h-14 bg-muted animate-pulse" />;
}
export { PromoCalloutFallback as fallback };