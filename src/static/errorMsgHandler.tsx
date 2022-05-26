import { useTranslation } from 'react-i18next';
import React from 'react';
import IconPermissionDenied from '../components/Icons/PermissionDenied';
import IconMoney from '../components/Icons/Money';
import IconNotFound from '../components/Icons/NotFound';
import IconEdit from '../components/Icons/Edit';
import IconKey from '../components/Icons/Key';
import IconTimeout from '../components/Icons/Timeout';
import IconConflict from '../components/Icons/Conflict';
import IconRunning from '../components/Icons/Running';
import IconServer from '../components/Icons/Server';
import EmojiTired from '../components/Icons/Emojis/Tired';
import IconLegal from '../components/Icons/Legal';
import IconBug from '../components/Icons/Bug';

export interface ErrorMessageTitle {
	title : string,
	icon? : JSX.Element
}

export default function ErrorMessageHandler() {

	const { t } = useTranslation();

	const httpStatusToTitle = (status: number): ErrorMessageTitle => {
		switch (status) {
			case 400:
			case 406:
			case 411:
			case 412:
			case 413:
			case 414:
			case 415:
			case 416:
			case 417:
			case 418:
			case 422:
			case 424:
			case 425:
			case 426:
			case 428:
			case 431:
			case 501:
			case 505:
				return { title: t("errors.title.invalid-data"), 		icon: (<IconEdit slashed/>)		};
			case 401:
			case 423:
				return { title: t("errors.title.permission-denied"),	icon: (<IconPermissionDenied/>) };
			case 402:
				return { title: t("errors.title.payment-required"),		icon: (<IconMoney/>) 			};
			case 403:
				return { title: t("errors.title.access-forbidden"),		icon: (<IconPermissionDenied/>) };
			case 404:
				return { title: t("errors.title.not-found"),			icon: (<IconNotFound/>)			};
			case 405:
				return { title: t("errors.title.not-allowed"),			icon: (<IconPermissionDenied/>)	};
			case 407:
			case 511:
				return { title: t("errors.title.invalid-auth"),			icon: (<IconKey slashed/>)		};
			case 408:
			case 504:
				return { title: t("errors.title.timeout"),				icon: (<IconTimeout />)			};
			case 409:
				return { title: t("errors.title.info-conflict"),		icon: (<IconConflict />)	  	};
			case 410:
				return { title: t("errors.title.gone"),					icon: (<IconRunning/>)			};
			case 421:
				return { title: t("errors.title.invalid-server"),		icon: (<IconServer slashed/>)	};
			case 429:
				return { title:  t("errors.title.too-many-requests"),	icon: (<EmojiTired />)			};
			case 451:
				return { title: t("errors.title.legal-issues"),			icon: (<IconLegal />)			};
			
			case 502:
			case 507:
			case 508:
				return { title: t("errors.title.server-issues"),		icon: (<IconServer slashed/>)	};
			case 503:
				return { title: t("errors.title.server-unavail"),		icon: (<IconServer slashed/>)	};
				
			default:
				return { title:  t("errors.title.generic"),				icon: (<IconBug />)				};
		}
	}

	return {
    	httpStatusToTitle
  	}

}