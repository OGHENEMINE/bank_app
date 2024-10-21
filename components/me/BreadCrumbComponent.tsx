import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Fragment } from "react/jsx-runtime";
interface BreadCrumbItemProp {
  href: string;
  text: string;
}

interface BreadCrumbProps {
  items: BreadCrumbItemProp[];
  currentPage?: string;
}

const BreadcrumbComponent = ({ items, currentPage }: BreadCrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map(({ href, text }, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              <Link href={href}>{text}</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
