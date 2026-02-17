import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { productAPI } from '../utils/api';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getProduct(productId);
      setProduct(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load product');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await productAPI.removeFavorite(productId);
      } else {
        await productAPI.addFavorite(productId);
      }
      setIsFavorite(!isFavorite);
      Alert.alert(
        'Success',
        isFavorite ? 'Removed from favorites' : 'Added to favorites'
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update favorites');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: product.image }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.stars}>
            {'★'.repeat(Math.floor(product.rating || 0))}
            {'☆'.repeat(5 - Math.floor(product.rating || 0))}
          </Text>
          <Text style={styles.rating}>{product.rating || 0}/5</Text>
          <Text style={styles.reviews}>({product.reviews || 0} reviews)</Text>
        </View>

        <Text style={styles.category}>{product.category}</Text>

        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.priceSection}>
          <Text style={styles.price}>${product.price}</Text>
          <TouchableOpacity
            style={[styles.favoriteBtn, isFavorite && styles.favoriteBtnActive]}
            onPress={handleFavoriteToggle}
          >
            <Text style={styles.favoriteBtnText}>
              {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addToCartBtn}>
          <Text style={styles.addToCartBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtn: {
    padding: 15,
  },
  backText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#1e293b',
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  stars: {
    color: '#fbbf24',
    fontSize: 16,
  },
  rating: {
    color: '#cbd5e1',
    fontSize: 14,
  },
  reviews: {
    color: '#cbd5e1',
    fontSize: 12,
  },
  category: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    color: '#6366f1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  description: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    marginBottom: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  favoriteBtn: {
    borderWidth: 2,
    borderColor: '#6366f1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  favoriteBtnActive: {
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    borderColor: '#ec4899',
  },
  favoriteBtnText: {
    color: '#6366f1',
    fontWeight: '600',
    fontSize: 12,
  },
  addToCartBtn: {
    backgroundColor: '#6366f1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default ProductDetailScreen;
