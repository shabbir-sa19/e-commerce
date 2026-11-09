"use client"
import { usePathname } from 'next/navigation'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import React, { Suspense } from 'react';
import Link from 'next/link';

const BreadCrumb = () => {
  const segments = usePathname().split("/");
  return (
    <Breadcrumb>
      <BreadcrumbList >
        <Suspense fallback={<BreadcrumbItem />}>
          {segments.map((item, idx) => (
            <React.Fragment key={idx}>
              {idx === segments.length - 1 ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>{item}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      render={
                        <Link href={`/${item}`}>
                          {idx === 0 ? "HOME" : item}
                        </Link>} />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )}
            </React.Fragment>
          ))}
        </Suspense>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadCrumb
