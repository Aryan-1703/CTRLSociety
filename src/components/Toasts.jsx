export default function Toasts({ toasts }) {
	if (!toasts.length) return null;
	return (
		<div className="toasts" aria-live="polite">
			{toasts.map(t => (
				<div key={t.id} className="toast">
					{t.msg}
				</div>
			))}
		</div>
	);
}
