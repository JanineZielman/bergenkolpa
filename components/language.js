import Link from "next/link"
import { useRouter } from 'next/router';

export const LanguageSwitcher = ({ altLangs = [] , lang}) => {
	const router = useRouter();
	console.log(router)
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
            {/* <Link href={altLang.uid == 'home' ? '/' : altLang.uid} locale={altLang.lang}> */}
              <a  href={`/${altLang.lang}${router.asPath}`} >
								{altLang.lang.substring(0,2) == 'zh' ?
									'中文'
								:
									altLang.lang.substring(0,2)
								}
							</a>
            {/* </Link> */}
          </div>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;