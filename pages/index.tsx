import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Twitter } from "@/components/shared/icons";

import Search from "@/components/ens/search";

export default function Home() {
  return (
    <Layout>
      <motion.div
        className="max-w-4xl px-5 xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <Search />
      </motion.div>
    </Layout>
  );
}
