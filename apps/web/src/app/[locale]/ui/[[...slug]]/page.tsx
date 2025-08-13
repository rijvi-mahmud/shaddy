import { getTranslations, setRequestLocale } from "next-intl/server";
import { allUIs } from "contentlayer/generated";

import type { LocaleOptions } from "@/lib/shaddy/types/i18n";
import type { Metadata } from "next";

import "@/styles/mdx.css";

import { DashboardTableOfContents } from "@/components/docs/toc";
import { DocumentNotFound } from "@/components/docs/not-found";
import { getTableOfContents } from "@/lib/shaddy/utils/toc";
import { DocBreadcrumb } from "@/components/docs/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DocPageProps } from "@/lib/shaddy/types/docs";
import { DocHeading } from "@/components/docs/heading";
import { DocsPager } from "@/components/docs/pager";
import { DocLinks } from "@/components/docs/links";
import { defaultLocale } from "@/config/i18n";
import { Mdx } from "@/components/docs/mdx";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";
import { getDocFromParams } from "@/lib/shaddy/utils/doc";
import { uiConfig } from "@/config/ui";
import { BuyMeCoffee } from "@/components/ui/bmc";
import { ProductHuntBadge } from "@/components/ui/product-hunt-badge";

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const locale = params.locale;

  setRequestLocale(locale || defaultLocale);

  const doc = await getDocFromParams({ params, data: allUIs });

  if (!doc) {
    return {};
  }

  const [, ...docSlugList] = doc.slugAsParams.split("/");
  const docSlug = docSlugList.join("/") || "";

  return {
    title: doc.title,
    description: doc.description,

    openGraph: {
      type: "article",
      title: doc.title,
      url: absoluteUrl(`/${locale}/docs/${docSlug}`),
      description: doc.description,

      images: [
        {
          ...siteConfig.og.size,
          url: siteConfig.og.image,
          alt: siteConfig.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [siteConfig.og.image],
      creator: siteConfig.links.twitter.username,
    },
  };
}

export async function generateStaticParams(): Promise<
  DocPageProps["params"][]
> {
  const docs = allUIs.map((doc) => {
    const [locale, ...slugs] = doc.slugAsParams.split("/");

    return {
      slug: slugs,
      locale: locale as LocaleOptions,
    };
  });

  return docs;
}

export default async function DocPage({ params }: DocPageProps) {
  setRequestLocale(params.locale || defaultLocale);

  const doc = await getDocFromParams({ params, data: allUIs });
  const t = await getTranslations("ui");

  if (!doc) {
    return (
      <DocumentNotFound
        messages={{
          title: t("not_found.title"),
          description: t("not_found.description"),
        }}
      />
    );
  }

  const toc = await getTableOfContents(doc.body.raw);

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px] min-h-svh">
      <div className="mx-auto w-full min-w-0">
        <DocBreadcrumb
          docsConfig={uiConfig}
          rootPath="ui"
          doc={doc}
          messages={{
            docs: t("docs"),
          }}
        />

        <DocHeading
          title={doc.title}
          description={doc.description}
          notAvailable={doc.notAvailable}
          locale={params.locale}
        />

        <DocLinks links={doc.links} />

        <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} />
        </div>

        <DocsPager
          doc={doc}
          locale={params.locale}
          config={uiConfig}
          slugFor="ui"
        />
      </div>

      {doc.toc && (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 pt-4">
            <ScrollArea>
              <div className="sticky top-16 -mt-10 h-fit py-12">
                <DashboardTableOfContents
                  toc={toc}
                  sourceFilePath={doc._raw.sourceFilePath}
                  messages={{
                    onThisPage: t("on_this_page"),
                    editPageOnGitHub: t("edit_page_on_github"),
                    startDiscussionOnGitHub: t("start_discussion_on_github"),
                  }}
                />
              </div>
            </ScrollArea>
            <div>
              <ProductHuntBadge mode="dark" />
              <BuyMeCoffee className="text-2xl" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
