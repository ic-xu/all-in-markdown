/** @type {import('next').NextConfig} */
import crypto from 'crypto';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.plantuml.com',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'prismjs'],
  },

  webpack: (config, { isServer }) => {
    config.optimization.moduleIds = 'deterministic';
    config.optimization.runtimeChunk = 'single';
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 25,
      minSize: 20000,
      cacheGroups: {
        default: false,
        vendors: false,
        framework: {
          chunks: 'all',
          name: 'framework',
          test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
          priority: 40,
          enforce: true,
        },
        lib: {
          test(module) {
            return module.size() > 160000 &&
              /node_modules[/\\]/.test(module.identifier());
          },
          name(module) {
            const hash = crypto.createHash('sha1');
            hash.update(module.identifier());
            return hash.digest('hex').slice(0, 8);
          },
          priority: 30,
          minChunks: 1,
          reuseExistingChunk: true,
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          priority: 20,
        },
        shared: {
          name(module, chunks) {
            return crypto
              .createHash('sha1')
              .update(chunks.reduce((acc, chunk) => acc + chunk.name, ''))
              .digest('hex');
          },
          priority: 10,
          minChunks: 2,
          reuseExistingChunk: true,
        },
      },
    };
    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
          compilation.hooks.optimizeChunkAssets.tap('MyPlugin', (chunks) => {
            chunks.forEach((chunk) => {
              chunk.files.forEach((file) => {
                const hash = crypto.createHash('sha256');
                hash.update(file);
                const digest = hash.digest('hex');
                console.log(`File: ${file}, Hash: ${digest}`);
              });
            });
          });
        });
      },
    });
    return config;
  },
};

export default nextConfig;