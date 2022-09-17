import React from 'react';
import SourcePageTabs from '@/components/Pages/Sources/SourcerPage/SourcePageTabs';
import SourcePageEmploymentHistory from '@/components/Pages/Sources/SourcerPage/SourcePageEmploymentHistory';

const SourcePageContent = ({
	userBio,
	feedbackCompleted,
	feedbackInProgress,
	employments,
	userId,
}) => {
	return (
		<>
			<div className="sourcer-page-content">
				{userBio && userBio.length > 0 && (
					<>
						<div className="sourcer-page-bio">
							<h6>About me</h6>
							<p>{userBio}</p>
						</div>
						<hr />
						<div className="15" />
					</>
				)}

				<div className="sourcer-page-feedbacks">
					<h6>Work history and feedback</h6>
					<div className="divider-20" />
					<SourcePageTabs
						feedbackCompleted={feedbackCompleted}
						feedbackInProgress={feedbackInProgress}
					/>
				</div>
				<div className="divider-30" />
				<div className="sourcer-page-employment-history">
					<SourcePageEmploymentHistory userId={userId} employments={employments} />
				</div>
			</div>
		</>
	);
};

export default SourcePageContent;
