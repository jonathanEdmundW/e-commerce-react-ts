import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
} from "@mui/material";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type ItemProps = {
  product: Product;
  handleAddToCart: (clickedItem: Product) => void;
};

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function ItemCard({ product, handleAddToCart }: ItemProps) {
  const { title, price, category, description, image } = product;

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          height: 200,
          objectFit: "contain",
          padding: 2,
          backgroundColor: "#f9f9f9",
        }}
      />

      <CardContent sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column"
      }}>
        <Chip
          label={capitalize(category)}
          size="small"
          sx={{
            marginBottom: 1,
            fontWeight: 500,
          }}
        />

        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginBottom: 2,
            height: 60,
            overflow: "hidden",
          }}
        >
          {description}
        </Typography>

        <Typography
          variant="h6"
        >${price}</Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{
            marginTop: "auto",
            borderRadius: 2,
            textTransform: "none",
          }}
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

const getProducts = async (): Promise<Product[]> => {
  const response = await fetch("https://fakestoreapi.com/products");
  return response.json();
};

function handleAddToCart(clickedItem: Product) {
  console.log(clickedItem);
}

function App() {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: [
      "products", //
    ],
    queryFn: getProducts,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error instanceof Error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="App">
      <Grid container spacing={3}>
        {data?.map((p) => (
          <Grid key={p.id} size={{ xs: 12, sm: 4 }}>
            <ItemCard product={p} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;