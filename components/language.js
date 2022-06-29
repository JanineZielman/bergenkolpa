import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react';

export const LanguageSwitcher = ({ altLangs = [] , lang}) => {
	const router = useRouter();
	const [url, setUrl] = useState(null);
	useEffect(() => {
    setUrl(router.asPath)
  });
  return (
    <div className="language-switcher">
			<div className="current-language lang" id={lang}>

					<a href={`/${lang}${router.asPath}`}>
						{lang.substring(0,2) == 'zh' ?
							'中文'
						:
							lang.substring(0,2)
						}
					</a>
			</div>
      {altLangs.map((altLang) => {
        return (
					<div key={altLang.lang} id={altLang.lang} className="lang">
						<a  href={`/${altLang.lang}${url}`} >
							{altLang.lang.substring(0,2) == 'zh' ?
								'中文'
							:
								altLang.lang.substring(0,2)
							}
						</a>
					</div>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;