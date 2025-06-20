import Image from 'next/image'

const ImageSize = ({item, parent}) => {
  return(
		<>
			{item['aspect-ratio'] == null &&	
				<Image 
						src={item.image.url} 
						alt={item.image.alt ? item.image.alt : `van Bergen Kolpa - ${parent?.data.title}`}
						width={'1520'}
						height={'1080'}
				/>
			}
			{item['aspect-ratio'] == 'Main' &&	
				<Image 
						src={item.image.url} 
						alt={item.image.alt ? item.image.alt : `van Bergen Kolpa - ${parent?.data.title}`}
						width={'1520'}
						height={'1080'}
				/>
			}
			{item['aspect-ratio'] == 'Landscape' &&	
				<Image 
						src={item.image.landscape ? item.image.landscape.url : item.image.url} 
						alt={item.image.alt ? item.image.alt : `van Bergen Kolpa - ${parent?.data.title}`}
						width={'1920'}
						height={'1080'}
				/>
			}
			{item['aspect-ratio'] == 'Square' &&	
				<Image 
						src={item.image.square ? item.image.square.url : item.image.square} 
						alt={item.image.alt ? item.image.alt : `van Bergen Kolpa - ${parent?.data.title}`}
						width={'1080'}
						height={'1080'}
				/>
			}
			{item['aspect-ratio'] == 'Portrait' &&	
				<Image 
						src={item.image.portrait ? item.image.portrait.url : item.image.url} 
						alt={item.image.alt ? item.image.alt : `van Bergen Kolpa - ${parent?.data.title}`}
						width={'763'}
						height={'1080'}
				/>
			}
			{item['aspect-ratio'] == 'Narrow' &&	
				<Image 
						src={item.image.narrow ? item.image.narrow.url : item.image.url} 
						alt={item.image.alt ? item.image.alt : `van Bergen Kolpa - ${parent?.data.title}`}
						width={'610'}
						height={'1080'}
				/>
			}	
		</>
  )
  
}

export default ImageSize;
