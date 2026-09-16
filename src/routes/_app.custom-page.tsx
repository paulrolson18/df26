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
import { PageType } from '@/lib/decorators/page-type';
import { RegionDefinition } from '@/lib/decorators/region-definition';
import { Region } from '@/components/region';
import { fetchPageWithComponentData } from '@/lib/page-designer/page-loader.server';
import type { Route } from './+types/_app.custom-page';
import CustomBanner from '@/components/custom-banner';

@PageType({
    name: 'Custom Collection Page',
    description: 'Demo page for Page Designer orchestration exercise'
})
@RegionDefinition([{
    id: 'promoZone',
    name: 'Promo Zone',
    description: 'Promotional callout area',
    maxComponents: 1
}])
export class CustomPageMetadata {}

export async function loader(args: Route.LoaderArgs) {
    return { page: await fetchPageWithComponentData(args, { pageId: 'custompage' }) };
}

export default function CustomPage({ loaderData }: Route.ComponentProps) {
    return (
        <>
            <CustomBanner title="Welcome to the Custom Collection!" />
            <Region
                page={loaderData.page}
                regionId="promoZone"
                errorElement={
                    <CustomBanner
                        title="Static fallback — no author content yet"
                        className="bg-muted text-foreground"
                    />
                }
            />
        </>
    );
}