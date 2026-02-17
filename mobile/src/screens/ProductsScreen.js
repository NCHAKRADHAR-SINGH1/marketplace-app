import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import { productAPI } from '../utils/api';

const ProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productAPI.getProducts(search, page, 10, 'all');
      setProducts(response.data.products);
      setTotalPages(response.data.pagination.pages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        defaultSource={require('../assets/placeholder.png')}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {item.rating || 0}</Text>
          <Text style={styles.reviews}>({item.reviews || 0})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#6366f1"
          style={styles.loader}
        />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}

      <View style={styles.pagination}>
        <TouchableOpacity
          style={[styles.paginationBtn, page === 1 && styles.disabledBtn]}
          onPress={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          <Text style={styles.paginationBtnText}>← Prev</Text>
        </TouchableOpacity>
        <Text style={styles.pageInfo}>
          {page} / {totalPages}
        </Text>
        <TouchableOpacity
          style={[styles.paginationBtn, page === totalPages && styles.disabledBtn]}
          onPress={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
        >
          <Text style={styles.paginationBtnText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  searchInput: {
    margin: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#1e293b',
    color: '#f1f5f9',
    borderRadius: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: 15,
    backgroundColor: '#1e293b',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#0f172a',
  },
  productInfo: {
    padding: 10,
  },
  productTitle: {
    color: '#f1f5f9',
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 5,
  },
  productPrice: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  rating: {
    color: '#fbbf24',
    fontSize: 12,
  },
  reviews: {
    color: '#cbd5e1',
    fontSize: 12,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    backgroundColor: '#1e293b',
  },
  paginationBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#6366f1',
    borderRadius: 6,
  },
  disabledBtn: {
    opacity: 0.5,
  },
  paginationBtnText: {
    color: 'white',
    fontWeight: '500',
  },
  pageInfo: {
    color: '#cbd5e1',
    fontWeight: '500',
  },
});

export default ProductsScreen;
