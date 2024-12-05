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
          compilation.hooks.processAssets.tap({
            name: 'MyPlugin',
            stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
            // ... 其他配置 ...
          }, (assets) => {
            const chunks = assets.chunks; // 确保这是正确的获取方式
            if (Array.isArray(chunks)) {
              chunks.forEach(chunk => {
                // 处理每个 chunk
              });
            } else {
              console.error('Expected chunks to be an array, but got:', chunks);
            }
          });
        });
      },
    });

    return config;
  },
};

export default nextConfig;