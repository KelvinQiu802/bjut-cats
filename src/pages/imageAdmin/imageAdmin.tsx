import { View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { requestAwait } from '../../../utils/await';
import ImageItem from './components/ImageItem';
import { API_HOST } from '../../../utils/db';

function ImageAdmin() {
  // 点击图片放大，可以修改校区，猫咪名称和状态
  const [images, setImages] = useState<Image[]>([]);

  async function refreshImages() {
    const { data } = (await requestAwait(
      'GET',
      `${API_HOST}/api/images/待审核`
    )) as {
      data: Image[];
    };
    setImages(data);
  }

  useEffect(() => {
    refreshImages();
  }, []);

  return (
    <View className="content">
      {images.map((image) => (
        <ImageItem
          key={image.imageUrl}
          image={image}
          refreshImages={refreshImages}
        />
      ))}
    </View>
  );
}

export default ImageAdmin;
