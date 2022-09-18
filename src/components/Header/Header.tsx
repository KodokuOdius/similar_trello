import "./Header.scss"
import Link from "@components/Link";
import Button from "@components/Button";

const Header = () => {
    return (
        <header className="main-header">
            <Link className="main-header__logo">
                Similar Trello
            </Link>
            <div className="main-header__navigation">
                <Button className="nav__button">Feature</Button>
                <Button className="nav__button">Solution</Button>
                <Button className="nav__button">Plans</Button>
                <Button className="nav__button">Resources</Button>
            </div>
            <div className="main-header__login">
                <Link className="login__link">
                    Log In
                </Link>
            </div>
        </header>
    );
};
export default Header;