import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import ReactStars from "react-rating-stars-component";
import { usePathname } from "next/navigation";
import { useProductReviewUpdateQuery } from "@/hooks/use-product-rating";

const ReviewUpdateForm = ({ review, setOpenForm, openForm }) => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const {
    mutate: updateReveiwProduct,
    data,
    isSuccess,
  } = useProductReviewUpdateQuery(id);

  const form = useForm({
    // resolver: zodResolver(productSchema),
    defaultValues: {
      comment: review?.comment,
      star: review?.star,
    },
  });

  const onSubmit = (formValues) => {
    updateReveiwProduct({ reviewInfo: formValues, id: review?._id });
  };
  if (isSuccess) {
    setOpenForm(!openForm);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="h-40"
                  {...field}
                  placeholder="Type your review here."
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="star"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormLabel className="mt-2 text-xl">
                Select rate number :
              </FormLabel>
              <FormControl>
                <ReactStars
                  {...field}
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">
          Update review
        </Button>
      </form>
    </Form>
  );
};

export default ReviewUpdateForm;
