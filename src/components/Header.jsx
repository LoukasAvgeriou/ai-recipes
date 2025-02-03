import chefImage from "../assets/restaurant-chef-icon-16.png"

export default function Header() {
    return (
        <header className="header">
            <img src={chefImage} alt="chef icon" />
            <h1>Chef Claude</h1>
        </header>
    )
}