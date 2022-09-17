import React from 'react';
import Image from 'next/image';
import CustomRate from '@/components/UI/CustomRate';

const MissionItemAuthor = ({ user = {} }) => {
	return (
		<>
			{Object.keys(user).length > 0 && (
				<ul className="case-list align-center">
					<li>
						<div className="author">
							<div className="image d-in-flex d-shrink img-fit">
								<Image
									src={process.env.NEXT_PUBLIC_API_URL + user.photo}
									width={56}
									height={56}
									alt="author-photo"
									objectFit={'cover'}
								/>
							</div>
							<div className="author-content">
								<h5 className="fs-14 fw-400">
									{user.firstName} {user.lastName}
								</h5>
							</div>
						</div>
					</li>
					<li>
						<i className="ico-Location-marker" />{' '}
						<span className="fs-14">{user.location}</span>
					</li>
					{user.rating > 0 && (
						<li>
							<CustomRate
								color={'color-main'}
								readOnly
								rating={user.rating}
								size={'xs'}
								text={'reviews'}
								allowHalf
							/>
						</li>
					)}
				</ul>
			)}
		</>
	);
};

export default MissionItemAuthor;
