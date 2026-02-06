import { Link } from 'react-router-dom';

// renders a simple 404 page (fallback route) with a link back home (navigation)

export default function NotFoundPage() {
  return (
    <div className='flex flex-col gap-2'>
      <Link to="/"> Home</Link>
    </div>
  );
}
