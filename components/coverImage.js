import Image from 'next/image'

const CoverImage = ({item}) => {
  return(
		<>				
			{item.data['aspect-ratio'] == null && 
				<Image 
					src={item.data['cover-image'].url} 
					alt={item.data['cover-image'].alt ? item.data['cover-image'].alt : `van Bergen Kolpa - ${item.data.title}`}
					width={'1520'}
					height={'1080'}
				/>
			}
			{item.data['aspect-ratio'] == 'Main' && 
				<Image 
					src={item.data['cover-image'].url} 
					alt={item.data['cover-image'].alt ? item.data['cover-image'].alt : `van Bergen Kolpa - ${item.data.title}`}
					width={'1520'}
					height={'1080'}
				/>
			}
			{item.data['aspect-ratio'] == 'Landscape' &&
				<Image 
					src={item.data['cover-image'].landscape ? item.data['cover-image'].landscape.url : item.data['cover-image'].url} 
					alt={item.data['cover-image'].alt ? item.data['cover-image'].alt : `van Bergen Kolpa - ${item.data.title}`}
					width={'1920'}
					height={'1080'}
				/>
			}
			{item.data['aspect-ratio'] == 'Square' &&
				<Image 
					src={item.data['cover-image'].square ? item.data['cover-image'].square.url : item.data['cover-image'].url } 
					alt={item.data['cover-image'].alt ? item.data['cover-image'].alt : `van Bergen Kolpa - ${item.data.title}`}
					width={'1080'}
					height={'1080'}
				/>
			}
			{item.data['aspect-ratio'] == 'Portrait' &&
				<Image 
					src={item.data['cover-image'].portrait ? item.data['cover-image'].portrait.url : item.data['cover-image'].url} 
					alt={item.data['cover-image'].alt ? item.data['cover-image'].alt : `van Bergen Kolpa - ${item.data.title}`}
					width={'1080'}
					height={'1920'}
				/>
			}
			{item.data['aspect-ratio'] == 'Narrow' &&
				<Image 
					src={item.data['cover-image'].narrow ? item.data['cover-image'].narrow.url : item.data['cover-image'].url} 
					alt={item.data['cover-image'].alt ? item.data['cover-image'].alt : `van Bergen Kolpa - ${item.data.title}`}
					width={'1080'}
					height={'1920'}
				/>
			}				
		</>
  )
  
}

export default CoverImage;
