import React from 'react';
import CustomRate from '@/components/UI/CustomRate';

const SourcePageFeedback = () => {
	return (
		<div className="sourcer-feedback">
			<div className="sourcer-feedback__header">
				<h6 className="h-small color-main">Job Title</h6>
				<div className="sourcer-feedback__meta">
					<CustomRate color={'color-main'} readOnly rating={3.5} size={'xs'} allowHalf />
					<span className="sourcer-feedback__date">Mar 2, 2022 - Mar 7, 2022</span>
				</div>
				<div className="sourcer-feedback__content">
					<blockquote>
						&quot; Fantastic work. Great communication. Quick delivery. Very satisfied
						with the results. &quot;
					</blockquote>
					<div className="sourcer-feedback__price">
						<span className="price-value">$ 5000</span>
						<span>Fixed Price</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SourcePageFeedback;
