import { PRODUCTS, CAMPAIGN_IMG } from "../data/products";

export default function Campaign({ onAdd, onHover }) {
	return (
		<section className="camp">
			<div className="camp-img">
				<img src={CAMPAIGN_IMG} alt="Warrior Edition Campaign" loading="lazy" />
			</div>
			<div className="camp-body">
				<div className="reveal">
					<p className="camp-lbl">Warrior Edition</p>
					<h2 className="camp-h">
						FOR THOSE
						<br />
						WHO LEAD,
						<br />
						NOT
						<br />
						<span>FOLLOW.</span>
					</h2>
					<p className="camp-p">
						The Warrior Edition honours discipline, grit, and the mindset of those who
						forge their own path. Limited units. No restocks.
					</p>
					<button
						className="btn btn-r"
						onClick={() => onAdd(PRODUCTS[1])}
						onMouseEnter={() => onHover(true)}
						onMouseLeave={() => onHover(false)}
					>
						Shop Warrior Edition →
					</button>
				</div>
			</div>
		</section>
	);
}
