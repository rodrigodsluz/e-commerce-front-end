import { Navbar } from '../../components';

const Layout = ({
  title = 'Title',
  description = 'Description',
  className,
  children,
}) => (
  <>
    <Navbar />
    <div className="jumbotron">
      <h2>{title}</h2>
      <p className="lead">{description}</p>
    </div>
    <div className={className}>{children}</div>
  </>
);

export default Layout;
