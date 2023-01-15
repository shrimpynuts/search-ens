import Layout from "@/components/layout";
import { motion } from "framer-motion";
import { Github, Twitter } from "@/components/shared/icons";

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
        <div className="relative mt-8 w-full rounded-xl border border-gray-200 bg-white p-8 shadow-md">
          <h2 className="text-xl font-semibold">How does this work?</h2>
          <p className="mt-2">
            Each line in the textbox represents an ENS domain. As you list them,
            each of their availability will popup on the right side.
          </p>
          <a
            className="mt-4 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
            href="https://github.com/steven-tey/precedent"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            <p>View GitHub</p>
          </a>
        </div>
      </motion.div>
    </Layout>
  );
}
