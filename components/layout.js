import Navbar from './navbar';

export default function Layout({ children }) {
  return (
    <div className='light'>
      <div className='container'>
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
}
