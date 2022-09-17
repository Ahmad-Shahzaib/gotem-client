import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MWT_Col } from '@/components/UI/Grid';
import { useRouter } from 'next/router';
import { cutQueryParamsFromURL } from '@/helpers/cutQueryParamsFromURL';
import CustomRate from '@/components/UI/CustomRate';

const SourcesItem = ({ user }) => {
	const router = useRouter();
	return (
		<MWT_Col md={6} lg={12}>
			<div className="ls sources-wrap bordered">
				<div className="sources-content-wrap">
					<div className="sources-media d-shrink img-fit">
						<Image
							src={process.env.NEXT_PUBLIC_API_URL + user.photo}
							width={88}
							height={88}
							alt="source-photo"
							objectFit={'cover'}
						/>
					</div>
					<div className="sources-content">
						<Link href={cutQueryParamsFromURL(router.asPath) + '/' + user.slug}>
							<a>
								<p className="p-big color-darkColor">
									{user.firstName} {user.lastName}
								</p>
							</a>
						</Link>
						{user.showJobTitle && <p>{user.jobTitle}</p>}

						<CustomRate
							color={'color-main2'}
							readOnly
							rating={user.rating}
							size={'xs'}
							allowHalf
						/>
					</div>
				</div>
				<div className="sources-meta">
					<ul>
						<li>
							<span>Job success:</span> 96%
						</li>
						<li>
							<span>Rate:</span> $ {user.hourlyRate}/hr
						</li>
						<li>
							<span>Location:</span> {user.city}
							{user.administartiveArea.length > 0
								? ', ' + user.administartiveArea
								: ''}
						</li>
					</ul>
					<Link href={cutQueryParamsFromURL(router.asPath) + '/' + user.slug}>
						<a>View profile</a>
					</Link>
				</div>
			</div>
		</MWT_Col>
	);
};

export default SourcesItem;
