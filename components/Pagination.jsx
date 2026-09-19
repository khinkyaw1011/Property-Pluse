import Link from 'next/link';

const Pagination = ({ page, pageSize, totalItems, basePath = '/properties' }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const separator = basePath.includes('?') ? '&' : '?';

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {page > 1 ? (
        <Link
          href={`${basePath}${separator}page=${page - 1}`}
          className="mr-2 px-2 py-1 border border-gray-300 rounded"
        >
          Previous
        </Link>
      ) : null}

      <span className="mx-2">
        Page {page} of {totalPages}
      </span>

      {page < totalPages ? (
        <Link
          href={`${basePath}${separator}page=${page + 1}`}
          className="ml-2 px-2 py-1 border border-gray-300 rounded"
        >
          Next
        </Link>
      ) : null}
    </section>
  );
};

export default Pagination;