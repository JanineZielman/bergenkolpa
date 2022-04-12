import Link from "next/link"

export const LanguageSwitcher = ({ altLangs = [] , lang}) => {
	console.log(lang)
  return (
    <div className="language-switcher">
			<div className="current-language">
				<Link href={lang} locale={lang}>
					<a>
						{lang.substring(0,2) == 'zh' ?
							'中文'
						:
							lang.substring(0,2)
						}
					</a>
				</Link>
			</div>
      {altLangs.map((altLang) => {
        return (
          <div key={altLang.lang}>
            <Link href={altLang.uid == 'home' ? '/' : altLang.uid} locale={altLang.lang}>
              <a>
								{altLang.lang.substring(0,2) == 'zh' ?
									'中文'
								:
									altLang.lang.substring(0,2)
								}
							</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;