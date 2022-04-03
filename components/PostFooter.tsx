import Link from "next/link";

type PostFooterProps = {
  nextSlug: string;
  prevSlug: string | null | undefined;
};

function isNone(s: string | null | undefined) {
  return s === null || s === undefined || s === "";
}

export default function PostFooter(props: PostFooterProps) {
  return (
    <div>
      <hr></hr>
      <div className="m-auto my-8 max-w-5xl flex justify-between">
        <div className="">
          {!isNone(props.prevSlug) ? (
            <a href={`/${props.prevSlug}`}>&larr; previous</a>
          ) : (
            <a></a>
          )}
        </div>
        <div className="">
          <Link href="/">Home</Link>
        </div>
        <div className="">
          {!isNone(props.prevSlug) ? (
            <a href={`/${props.nextSlug}`}>next &rarr;</a>
          ) : (
            <a></a>
          )}
        </div>
      </div>
    </div>
  );
}
