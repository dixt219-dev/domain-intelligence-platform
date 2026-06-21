import { getHistoricalSalesByLength, getHubLongFormContent } from '../../../lib/marketEngine';

export async function generateMetadata({ params }) {
  return { title: `Premium ${params.length}-Letter Domains Market Report` };
}

export default async function AdvancedDomainHubPage({ params, searchParams }) {
  const length = params.length;
  const numLength = parseInt(length) || 4;
  const activeTld = searchParams.tld || 'all';
  const activeSort = searchParams.sort || 'highest_sale';

  const { salesData, stats } = await getHistoricalSalesByLength(numLength, activeTld, activeSort);
  const article = getHubLongFormContent(numLength);

  return (
    <main style={{ padding: '24px', fontFamily: 'sans-serif', backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh' }}>
      <header style={{ borderBottom: '1px solid #334155', paddingBottom: '16px', marginBottom: '24px' }}>
        <h1 style={{ color: '#fff', fontSize: '28px', margin: 0 }}>Market Database: <span style={{ color: '#818cf8' }}>{numLength}-Letter Domains</span></h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>Verified institutional transactions and macro liquidity metrics.</p>
      </header>

      <section style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b', marginBottom: '32px' }}>
        <h2 style={{ color: '#fff', fontSize: '18px', marginTop: 0 }}>📊 Historical Sales Matrix</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px' }}>
          <thead>
            <tr style={{ color: '#64748b', fontSize: '12px', borderBottom: '1px solid #1e293b', textAlign: 'left' }}>
              <th style={{ paddingBottom: '8px' }}>Asset</th>
              <th style={{ paddingBottom: '8px' }}>Last Sale</th>
              <th style={{ paddingBottom: '8px' }}>Comp. Average</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((asset, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #1e293b', fontSize: '14px' }}>
                <td style={{ padding: '12px 0', fontWeight: 'bold' }}>{asset.name}</td>
                <td style={{ color: '#34d399' }}>${asset.lastSale.toLocaleString()}</td>
                <td style={{ color: '#818cf8' }}>${asset.compAverage.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <article style={{ lineHeight: '1.6', color: '#cbd5e1', fontSize: '15px' }}>
        <h2 style={{ color: '#fff' }}>{article.title}</h2>
        <h3 style={{ color: '#818cf8' }}>{article.section1.heading}</h3>
        <p>{article.section1.body}</p>
        <h3 style={{ color: '#818cf8' }}>{article.section2.heading}</h3>
        <p>{article.section2.body}</p>
      </article>
    </main>
  );
}
