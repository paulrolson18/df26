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
import { forwardRef, type ComponentProps } from 'react';
import { cn } from '@/lib/utils';

interface CustomBannerProps extends ComponentProps<'div'> {
    title: string;
    subtitle?: string;
}

export const CustomBanner = forwardRef<HTMLDivElement, CustomBannerProps>(
    ({ title, subtitle, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'bg-primary text-primary-foreground px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16',
                    className
                )}
                {...props}>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">{title}</h2>
                {subtitle && <p className="mt-2 text-base md:text-lg text-primary-foreground/80">{subtitle}</p>}
            </div>
        );
    }
);
CustomBanner.displayName = 'CustomBanner';

export default CustomBanner;
