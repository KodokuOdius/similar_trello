import "./Footer.scss";
import Link from "@components/Link";

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="main-footer__info">
                <div className="logo__block">
                    <Link className="main-footer__logo">
                        Similar Trello
                    </Link>
                    <Link className="main-footer__login">
                        Log In
                    </Link>
                </div>
                <div className="info__block">
                    <ul className="info__list">
                        <li className="info__item">
                            <Link className="info__link">
                                <div className="inner__block">
                                    <h3 className="block__title">About Similar Trello</h3>
                                    <p className="block__text">What is behind the boards</p>
                                </div>
                            </Link>
                        </li>
                        <li className="info__item">
                            <Link className="info__link">
                                <div className="inner__block">
                                    <h3 className="block__title">Jobs</h3>
                                    <p className="block__text">Learn about open roles on the Trello team</p>
                                </div>
                            </Link>
                        </li>
                        <li className="info__item">
                            <Link className="info__link">
                                <div className="inner__block">
                                    <h3 className="block__title">Apps</h3>
                                    <p className="block__text">Download the Trello App for your Desktop or Mobile devices</p>
                                </div>
                            </Link>
                        </li>
                        <li className="info__item">
                            <Link className="info__link">
                                <div className="inner__block">
                                    <h3 className="block__title">Contact us</h3>
                                    <p className="block__text">Need anything? Get in touch and we can help.</p>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
