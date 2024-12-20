import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios"; // Ensure axios is imported
import Swal from "sweetalert2";

const AddProducts = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user } = useAuth();

  // Function to handle form submission
  const onSubmit = (data) => {
    const title = data.title;
    const brand = data.brand;
    const price = parseFloat(data.price); // Fixed syntax error
    const stock = parseInt(data.stock); // Fixed syntax error
    const category = data.category;
    const description = data.description; // Fixed typo ("descriptin" to "description")
    const imageUrl = data.imageUrl; // Add imageUrl from form data
    const sellerEmail = user.email;

    const product = {
      title,
      brand,
      price,
      stock,
      category,
      description,
      sellerEmail,
      imageUrl,
    };

    const token = localStorage.getItem("access-token");

    // Post request to add the product
    axios
      .post("http://localhost:5000/add-products", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if(res.data.insertedId){
                      Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Product Added",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    }
      })
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-12">Add Product</h1>
      <div>
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* Title and Category Field on the Same Line */}
            <div className="flex space-x-4 mb-4">
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Product Title"
                  className="input input-bordered"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
              </div>

              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("category", { required: "Category is required" })}
                >
                  <option disabled selected>
                    Select Category
                  </option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home</option>
                  <option value="sports">Sports</option>
                  <option value="books">Books</option>
                </select>
                {errors.category && <p className="text-red-500">{errors.category.message}</p>}
              </div>
            </div>

            {/* Brand and Price Field on the Same Line */}
            <div className="flex space-x-4 mb-4">
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text">Brand</span>
                </label>
                <input
                  type="text"
                  placeholder="Product Brand"
                  className="input input-bordered"
                  {...register("brand", { required: "Brand is required" })}
                />
                {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
              </div>

              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  className="input input-bordered"
                  {...register("price", {
                    required: "Price is required",
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "Price must be at least 1",
                    },
                  })}
                />
                {errors.price && <p className="text-red-500">{errors.price.message}</p>}
              </div>
            </div>

            {/* Stock Field */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Stock</span>
              </label>
              <input
                type="number"
                placeholder="Stock Quantity"
                className="input input-bordered"
                {...register("stock", {
                  required: "Stock quantity is required",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "Stock must be at least 1",
                  },
                })}
              />
              {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
            </div>

            {/* Description Field */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                placeholder="Product Description"
                className="input input-bordered"
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>

            {/* Image URL Field */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="text"
                placeholder="Image URL"
                className="input input-bordered"
                {...register("imageUrl", { required: "Image URL is required" })}
              />
              {errors.imageUrl && <p className="text-red-500">{errors.imageUrl.message}</p>}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
