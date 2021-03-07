import './style.scss';

const ParentPage = (props) => (
  <div className="parent-page">
    {props.children}
  </div>
)

export default ParentPage;