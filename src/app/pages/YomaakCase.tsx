import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { CaseNav } from '../components/CaseNav';

type PrototypeState = 'search' | 'profile' | 'quote' | 'confirmation';
type Language = 'en' | 'ar';

interface Vendor {
  id: string;
  name: string;
  nameAr: string;
  location: string;
  locationAr: string;
  region: string;
  regionAr: string;
  description: string;
  descriptionAr: string;
  moq: string;
  moqAr: string;
  lead: string;
  leadAr: string;
  price: string;
  priceAr: string;
  certs: string[];
  certsAr: string[];
  story: string;
  storyAr: string;
  capacity: string;
  capacityAr: string;
  markets: string;
  marketsAr: string;
  ports: string;
  portsAr: string;
  products: { name: string; nameAr: string; price: string; priceAr: string }[];
}

const VENDORS: Vendor[] = [
  {
    id: 'binhamza',
    name: 'Bin Hamza Trading Co.',
    nameAr: 'شركة بن حمزة للتجارة',
    location: 'Sanaa · Yemen',
    locationAr: 'صنعاء · اليمن',
    region: 'Haraz',
    regionAr: 'حراز',
    description: 'Haraz mountain green beans · natural · grade A',
    descriptionAr: 'حبوب خضراء من جبال حراز · طبيعي · درجة A',
    moq: '100kg',
    moqAr: '١٠٠ كجم',
    lead: '14–21 days',
    leadAr: '١٤-٢١ يوم',
    price: 'SAR 168/kg',
    priceAr: '١٦٨ ريال/كجم',
    certs: ['HALAL', 'ORG'],
    certsAr: ['حلال', 'عضوي'],
    story: 'Family-owned estate in the Haraz mountains, producing specialty coffee for three generations. Direct relationships with local farmers ensure consistent quality and fair compensation.',
    storyAr: 'مزرعة عائلية في جبال حراز، تنتج القهوة المتخصصة منذ ثلاثة أجيال. العلاقات المباشرة مع المزارعين المحليين تضمن جودة متسقة وتعويض عادل.',
    capacity: '2,400 tons/year',
    capacityAr: '٢٬٤٠٠ طن/سنة',
    markets: 'Saudi Arabia, UAE, Kuwait',
    marketsAr: 'السعودية، الإمارات، الكويت',
    ports: 'Jeddah, Dubai',
    portsAr: 'جدة، دبي',
    products: [
      { name: 'Haraz Grade A Natural', nameAr: 'حراز درجة A طبيعي', price: 'SAR 168/kg', priceAr: '١٦٨ ريال/كجم' },
      { name: 'Haraz Grade B Natural', nameAr: 'حراز درجة B طبيعي', price: 'SAR 142/kg', priceAr: '١٤٢ ريال/كجم' },
      { name: 'Mixed Estate Blend', nameAr: 'خليط المزرعة المختلط', price: 'SAR 98/kg', priceAr: '٩٨ ريال/كجم' },
    ],
  },
  {
    id: 'almatari',
    name: 'Al-Matari Coffee Estate',
    nameAr: 'مزرعة المطري للقهوة',
    location: 'Sanaa · Yemen',
    locationAr: 'صنعاء · اليمن',
    region: 'Bani Matar',
    regionAr: 'بني مطر',
    description: 'Bani Matar single-estate · washed · specialty',
    descriptionAr: 'مزرعة واحدة من بني مطر · مغسول · متخصص',
    moq: '250kg',
    moqAr: '٢٥٠ كجم',
    lead: '21–28 days',
    leadAr: '٢١-٢٨ يوم',
    price: 'SAR 214/kg',
    priceAr: '٢١٤ ريال/كجم',
    certs: ['SCA 87+'],
    certsAr: ['SCA ٨٧+'],
    story: 'Premium single-estate producer specializing in washed processing. SCA-certified scoring consistently above 87 points.',
    storyAr: 'منتج متميز من مزرعة واحدة متخصص في المعالجة المغسولة. معتمد من SCA بدرجة تزيد عن ٨٧ نقطة باستمرار.',
    capacity: '1,800 tons/year',
    capacityAr: '١٬٨٠٠ طن/سنة',
    markets: 'Saudi Arabia, UAE',
    marketsAr: 'السعودية، الإمارات',
    ports: 'Jeddah',
    portsAr: 'جدة',
    products: [
      { name: 'Bani Matar Washed SCA 87+', nameAr: 'بني مطر مغسول SCA ٨٧+', price: 'SAR 214/kg', priceAr: '٢١٤ ريال/كجم' },
      { name: 'Estate Reserve Washed', nameAr: 'احتياطي المزرعة المغسول', price: 'SAR 188/kg', priceAr: '١٨٨ ريال/كجم' },
    ],
  },
  {
    id: 'mokha',
    name: 'Mokha Heritage Exports',
    nameAr: 'صادرات تراث المخا',
    location: 'Hodeida · Yemen',
    locationAr: 'الحديدة · اليمن',
    region: 'Ismaili',
    regionAr: 'إسماعيلي',
    description: 'Ismaili heirloom · sun-dried natural · grade A+',
    descriptionAr: 'إسماعيلي إرث · طبيعي مجفف بالشمس · درجة A+',
    moq: '60kg',
    moqAr: '٦٠ كجم',
    lead: '10–14 days',
    leadAr: '١٠-١٤ يوم',
    price: 'SAR 142/kg',
    priceAr: '١٤٢ ريال/كجم',
    certs: ['FOB JEDDAH'],
    certsAr: ['FOB جدة'],
    story: 'Historic port city exporter preserving heirloom Ismaili varietals through traditional sun-drying methods passed down for centuries.',
    storyAr: 'مصدر مدينة ميناء تاريخي يحافظ على أصناف إسماعيلي الموروثة من خلال طرق التجفيف التقليدية بالشمس الموروثة عبر القرون.',
    capacity: '800 tons/year',
    capacityAr: '٨٠٠ طن/سنة',
    markets: 'Saudi Arabia',
    marketsAr: 'السعودية',
    ports: 'Jeddah',
    portsAr: 'جدة',
    products: [
      { name: 'Ismaili Heirloom Natural', nameAr: 'إسماعيلي إرث طبيعي', price: 'SAR 142/kg', priceAr: '١٤٢ ريال/كجم' },
      { name: 'Traditional Sun-Dried', nameAr: 'مجفف بالشمس التقليدي', price: 'SAR 118/kg', priceAr: '١١٨ ريال/كجم' },
    ],
  },
];

function YomaakPrototype() {
  const [state, setState] = useState<PrototypeState>('search');
  const [lang, setLang] = useState<Language>('en');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [quantity, setQuantity] = useState(500);

  const isRTL = lang === 'ar';

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
      <div style={{
        border: '1px solid #E5E9F0',
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(10, 22, 40, 0.04), 0 24px 48px -16px rgba(10, 22, 40, 0.08)',
      }}>
        {/* Chrome */}
        <div style={{
          background: '#F4F6FA',
          borderBottom: '1px solid #E5E9F0',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#E5E5E5', '#E5E5E5', '#E5E5E5'].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#5B6B82' }}>
            claude.ai · /chat · MCP App: yomaak-b2b
          </span>
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E9F0',
              borderRadius: 12,
              padding: '4px 12px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
              color: '#0A1628',
              cursor: 'pointer',
            }}
          >
            {lang === 'en' ? 'EN / AR' : 'AR / EN'}
          </button>
        </div>

        {/* Chat interface */}
        <div style={{
          background: '#FAFBFC',
          padding: 32,
          minHeight: 500,
          fontFamily: 'Inter, sans-serif',
          direction: isRTL ? 'rtl' : 'ltr',
          cursor: 'auto',
        }}>
          {/* User message */}
          <div style={{ display: 'flex', justifyContent: isRTL ? 'flex-start' : 'flex-end', marginBottom: 24 }}>
            <div style={{
              background: '#EBF1FF',
              color: '#0A1628',
              padding: '16px 20px',
              borderRadius: 12,
              maxWidth: '70%',
              fontSize: 15,
              lineHeight: 1.6,
            }}>
              {isRTL
                ? 'أبحث عن قهوة يمنية بالجملة لإطلاق محمصة في الرياض. أحتاج حوالي ٥٠٠ كجم من حبوب يمنية أصل واحد، توصيل الربع الثاني، FOB جدة مفضل.'
                : "I am sourcing wholesale coffee for a roastery launch in Riyadh. Looking for ~500kg of single-origin Yemeni beans, Q2 delivery, FOB Jeddah preferred."}
            </div>
          </div>

          {/* Claude response */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#0A1628',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 600,
              flexShrink: 0,
            }}>
              C
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#0A1628', fontSize: 15, lineHeight: 1.6, marginBottom: 12 }}>
                {isRTL
                  ? 'دعني أتحقق من كتالوج Yomaak B2B للموردين اليمنيين...'
                  : 'Let me check the Yomaak B2B catalog for Yemeni single-origin coffee suppliers...'}
              </p>
              <div style={{
                background: '#EBF1FF',
                border: '1px solid #0A5BFF',
                borderRadius: 6,
                padding: '8px 12px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 11,
                color: '#0A1628',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 20,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0F9D58' }} />
                <span>
                  {isRTL
                    ? 'yomaak_b2b_search_products · "قهوة يمنية FOB جدة"'
                    : 'yomaak_b2b_search_products · "yemeni coffee FOB jeddah"'}
                </span>
              </div>

              {/* Widget */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #E5E9F0',
                borderRadius: 8,
                padding: 24,
                transition: 'all 200ms ease-out',
              }}>
                {state === 'search' && (
                  <>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 16,
                          height: 16,
                          background: '#0A5BFF',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 2,
                          fontSize: 10,
                          fontWeight: 600,
                        }}>
                          Y
                        </div>
                        <span style={{ fontSize: 15, fontWeight: 600, color: '#0A1628' }}>
                          {isRTL ? 'يُماك B2B' : 'Yomaak B2B'}
                        </span>
                        <span style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: 9,
                          color: '#5B6B82',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                        }}>
                          {isRTL ? 'جملة · منطقة الشرق الأوسط وشمال أفريقيا' : 'WHOLESALE · MENA'}
                        </span>
                      </div>
                      {!isRTL && (
                        <span style={{ fontSize: 13, color: '#5B6B82', fontStyle: 'italic' }}>
                          Showing: 500kg Yemeni coffee, FOB Jeddah
                        </span>
                      )}
                    </div>

                    {/* Count */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 500, color: '#0A1628', margin: 0 }}>
                        <span style={{ color: '#0A5BFF' }}>
                          {isRTL ? '٣' : '3'}
                        </span>{' '}
                        {isRTL ? 'موردين مطابقين' : 'matching vendors'}
                      </h3>
                      <span style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 9,
                        color: '#94A3B8',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}>
                        {isRTL ? 'مرتب حسب الملاءمة' : 'SORTED BY RELEVANCE'}
                      </span>
                    </div>

                    {/* Vendor cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {VENDORS.map((vendor) => (
                        <div
                          key={vendor.id}
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #E5E9F0',
                            borderRadius: 6,
                            padding: 16,
                            display: 'flex',
                            gap: 16,
                            transition: 'border-color 200ms ease, transform 200ms ease',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#0A5BFF';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#E5E9F0';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          {/* Region block */}
                          <div style={{
                            width: 96,
                            height: 96,
                            background: 'linear-gradient(135deg, #EBF1FF 0%, #FFFFFF 100%)',
                            borderRadius: 4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 14,
                            fontWeight: 500,
                            color: '#0A5BFF',
                            flexShrink: 0,
                          }}>
                            {isRTL ? vendor.regionAr : vendor.region}
                          </div>

                          {/* Card body */}
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div>
                              <h4 style={{ fontSize: 16, fontWeight: 600, color: '#0A1628', margin: '0 0 6px' }}>
                                {isRTL ? vendor.nameAr : vendor.name}
                              </h4>
                              <span style={{
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: 9,
                                color: '#5B6B82',
                                background: '#EBF1FF',
                                padding: '3px 8px',
                                borderRadius: 3,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                              }}>
                                {isRTL ? vendor.locationAr : vendor.location}
                              </span>
                              <p style={{ fontSize: 13, color: '#5B6B82', margin: '6px 0 0', lineHeight: 1.4 }}>
                                {isRTL ? vendor.descriptionAr : vendor.description}
                              </p>
                            </div>

                            {/* Metrics */}
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr 1fr',
                              gap: 16,
                              borderTop: '1px solid #E5E9F0',
                              borderBottom: '1px solid #E5E9F0',
                              padding: '10px 0',
                            }}>
                              <div>
                                <div style={{
                                  fontFamily: 'JetBrains Mono, monospace',
                                  fontSize: 10,
                                  color: '#94A3B8',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.05em',
                                  marginBottom: 4,
                                }}>
                                  {isRTL ? 'الحد الأدنى للطلب' : 'MOQ'}
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 500, color: '#0A1628' }}>
                                  {isRTL ? vendor.moqAr : vendor.moq}
                                </div>
                              </div>
                              <div>
                                <div style={{
                                  fontFamily: 'JetBrains Mono, monospace',
                                  fontSize: 10,
                                  color: '#94A3B8',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.05em',
                                  marginBottom: 4,
                                }}>
                                  {isRTL ? 'المهلة' : 'Lead time'}
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 500, color: '#0A1628' }}>
                                  {isRTL ? vendor.leadAr : vendor.lead}
                                </div>
                              </div>
                              <div>
                                <div style={{
                                  fontFamily: 'JetBrains Mono, monospace',
                                  fontSize: 10,
                                  color: '#94A3B8',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.05em',
                                  marginBottom: 4,
                                }}>
                                  {isRTL ? 'السعر/كجم' : 'Price per kg'}
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 500, color: '#0A5BFF' }}>
                                  {isRTL ? vendor.priceAr : vendor.price}
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                              <div style={{ display: 'flex', gap: 10 }}>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedVendor(vendor);
                                    setState('quote');
                                  }}
                                  style={{
                                    background: '#0A1628',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: 6,
                                    padding: '10px 20px',
                                    fontSize: 13,
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'background 200ms ease',
                                  }}
                                  onMouseEnter={(e) => (e.currentTarget.style.background = '#0A5BFF')}
                                  onMouseLeave={(e) => (e.currentTarget.style.background = '#0A1628')}
                                >
                                  {isRTL ? 'طلب عرض سعر ←' : 'Request quote →'}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedVendor(vendor);
                                    setState('profile');
                                  }}
                                  style={{
                                    background: 'transparent',
                                    color: '#0A1628',
                                    border: '1px solid #E5E9F0',
                                    borderRadius: 6,
                                    padding: '10px 20px',
                                    fontSize: 13,
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'border-color 200ms ease',
                                  }}
                                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#0A1628')}
                                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#E5E9F0')}
                                >
                                  {isRTL ? 'الملف الشخصي' : 'Profile'}
                                </button>
                              </div>
                              <div style={{ display: 'flex', gap: 6 }}>
                                {(isRTL ? vendor.certsAr : vendor.certs).map((cert) => (
                                  <span
                                    key={cert}
                                    style={{
                                      fontFamily: 'JetBrains Mono, monospace',
                                      fontSize: 9,
                                      color: '#5B6B82',
                                      background: '#F4F6FA',
                                      padding: '4px 8px',
                                      borderRadius: 3,
                                      textTransform: 'uppercase',
                                    }}
                                  >
                                    {cert}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {state === 'profile' && selectedVendor && (
                  <>
                    <button
                      onClick={() => setState('search')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#0A5BFF',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 11,
                        cursor: 'pointer',
                        marginBottom: 20,
                        padding: 0,
                      }}
                    >
                      {isRTL ? '→ عودة إلى النتائج' : '← Back to results'}
                    </button>

                    <h2 style={{ fontSize: 28, fontWeight: 500, color: '#0A1628', margin: '0 0 16px' }}>
                      {isRTL ? selectedVendor.nameAr : selectedVendor.name}
                    </h2>

                    <div style={{
                      borderLeft: isRTL ? 'none' : '3px solid #0A5BFF',
                      borderRight: isRTL ? '3px solid #0A5BFF' : 'none',
                      paddingLeft: isRTL ? 0 : 24,
                      paddingRight: isRTL ? 24 : 0,
                      marginBottom: 24,
                    }}>
                      <p style={{ fontSize: 15, color: '#5B6B82', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>
                        {isRTL ? selectedVendor.storyAr : selectedVendor.story}
                      </p>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      gap: 24,
                      marginBottom: 32,
                      padding: '20px 0',
                      borderTop: '1px solid #E5E9F0',
                      borderBottom: '1px solid #E5E9F0',
                    }}>
                      <div>
                        <div style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: 10,
                          color: '#94A3B8',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: 6,
                        }}>
                          {isRTL ? 'الطاقة السنوية' : 'Annual capacity'}
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 500, color: '#0A1628' }}>
                          {isRTL ? selectedVendor.capacityAr : selectedVendor.capacity}
                        </div>
                      </div>
                      <div>
                        <div style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: 10,
                          color: '#94A3B8',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: 6,
                        }}>
                          {isRTL ? 'الأسواق النشطة' : 'Active markets'}
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 500, color: '#0A1628' }}>
                          {isRTL ? selectedVendor.marketsAr : selectedVendor.markets}
                        </div>
                      </div>
                      <div>
                        <div style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: 10,
                          color: '#94A3B8',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: 6,
                        }}>
                          {isRTL ? 'موانئ FOB' : 'FOB ports'}
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 500, color: '#0A1628' }}>
                          {isRTL ? selectedVendor.portsAr : selectedVendor.ports}
                        </div>
                      </div>
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 500, color: '#0A1628', marginBottom: 16 }}>
                      {isRTL ? 'المنتجات المتاحة' : 'Available products'}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                      {selectedVendor.products.map((product, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px 16px',
                            background: '#F4F6FA',
                            borderRadius: 6,
                          }}
                        >
                          <span style={{ fontSize: 14, color: '#0A1628' }}>
                            {isRTL ? product.nameAr : product.name}
                          </span>
                          <span style={{ fontSize: 14, fontWeight: 500, color: '#0A5BFF' }}>
                            {isRTL ? product.priceAr : product.price}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setState('quote')}
                      style={{
                        background: '#0A1628',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: 6,
                        padding: '12px 24px',
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: 'pointer',
                        width: '100%',
                      }}
                    >
                      {isRTL ? 'طلب عرض سعر →' : 'Request quote →'}
                    </button>
                  </>
                )}

                {state === 'quote' && selectedVendor && (
                  <>
                    <button
                      onClick={() => setState('search')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#0A5BFF',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 11,
                        cursor: 'pointer',
                        marginBottom: 20,
                        padding: 0,
                      }}
                    >
                      {isRTL ? '→ عودة إلى النتائج' : '← Back to results'}
                    </button>

                    <h2 style={{ fontSize: 24, fontWeight: 500, color: '#0A1628', margin: '0 0 24px' }}>
                      {isRTL ? 'طلب عرض سعر' : 'Request quote'}
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                      <div>
                        <label style={{
                          display: 'block',
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: 11,
                          color: '#5B6B82',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: 8,
                        }}>
                          {isRTL ? 'الكمية' : 'Quantity'}
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <button
                            onClick={() => setQuantity(Math.max(50, quantity - 50))}
                            style={{
                              width: 36,
                              height: 36,
                              border: '1px solid #E5E9F0',
                              background: '#FFFFFF',
                              borderRadius: 6,
                              fontSize: 18,
                              cursor: 'pointer',
                              color: '#0A1628',
                            }}
                          >
                            −
                          </button>
                          <div style={{
                            flex: 1,
                            padding: '10px 16px',
                            border: '1px solid #E5E9F0',
                            borderRadius: 6,
                            textAlign: 'center',
                            fontSize: 15,
                            color: '#0A1628',
                          }}>
                            {isRTL ? `${quantity.toLocaleString('ar-SA')} كجم` : `${quantity} kg`}
                          </div>
                          <button
                            onClick={() => setQuantity(quantity + 50)}
                            style={{
                              width: 36,
                              height: 36,
                              border: '1px solid #E5E9F0',
                              background: '#FFFFFF',
                              borderRadius: 6,
                              fontSize: 18,
                              cursor: 'pointer',
                              color: '#0A1628',
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div>
                        <label style={{
                          display: 'block',
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: 11,
                          color: '#5B6B82',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: 8,
                        }}>
                          {isRTL ? 'أسبوع التسليم' : 'Delivery week'}
                        </label>
                        <input
                          type="text"
                          placeholder={isRTL ? '٢٠٢٦-٠٥-١٥' : '2026-05-15'}
                          style={{
                            width: '100%',
                            padding: '10px 16px',
                            border: '1px solid #E5E9F0',
                            borderRadius: 6,
                            fontSize: 15,
                            fontFamily: 'Inter, sans-serif',
                            color: '#0A1628',
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <label style={{
                        display: 'block',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 11,
                        color: '#5B6B82',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: 8,
                      }}>
                        {isRTL ? 'ميناء FOB' : 'FOB port'}
                      </label>
                      <input
                        type="text"
                        placeholder={isRTL ? 'جدة' : 'Jeddah'}
                        style={{
                          width: '100%',
                          padding: '10px 16px',
                          border: '1px solid #E5E9F0',
                          borderRadius: 6,
                          fontSize: 15,
                          fontFamily: 'Inter, sans-serif',
                          color: '#0A1628',
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <label style={{
                        display: 'block',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 11,
                        color: '#5B6B82',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: 8,
                      }}>
                        {isRTL ? 'الشروط التجارية' : 'Incoterms'}
                      </label>
                      <div style={{ display: 'flex', gap: 10 }}>
                        {['FOB', 'CIF', 'EXW'].map((term) => (
                          <button
                            key={term}
                            style={{
                              padding: '8px 16px',
                              border: term === 'FOB' ? '1px solid #0A5BFF' : '1px solid #E5E9F0',
                              background: term === 'FOB' ? '#EBF1FF' : '#FFFFFF',
                              borderRadius: 6,
                              fontSize: 13,
                              fontFamily: 'JetBrains Mono, monospace',
                              color: '#0A1628',
                              cursor: 'pointer',
                            }}
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <label style={{
                        display: 'block',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 11,
                        color: '#5B6B82',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: 8,
                      }}>
                        {isRTL ? 'ملاحظات إضافية' : 'Additional notes'}
                      </label>
                      <textarea
                        placeholder={isRTL ? 'أي متطلبات محددة...' : 'Any specific requirements...'}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #E5E9F0',
                          borderRadius: 6,
                          fontSize: 14,
                          fontFamily: 'Inter, sans-serif',
                          color: '#0A1628',
                          resize: 'vertical',
                          minHeight: 80,
                        }}
                      />
                    </div>

                    <div style={{
                      background: '#EBF1FF',
                      padding: '16px 20px',
                      borderRadius: 6,
                      marginBottom: 20,
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 6,
                      }}>
                        <span style={{ fontSize: 14, color: '#5B6B82' }}>
                          {isRTL ? 'الإجمالي المقدر:' : 'Estimated total:'}
                        </span>
                        <span style={{ fontSize: 18, fontWeight: 600, color: '#0A5BFF' }}>
                          {isRTL
                            ? `${(quantity * 168).toLocaleString('ar-SA')} ريال`
                            : `SAR ${(quantity * 168).toLocaleString()}`}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: '#94A3B8' }}>
                        {isRTL ? '+ تكاليف الشحن' : '+ shipping'}
                      </div>
                    </div>

                    <button
                      onClick={() => setState('confirmation')}
                      style={{
                        background: '#0A1628',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: 6,
                        padding: '14px 24px',
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: 'pointer',
                        width: '100%',
                      }}
                    >
                      {isRTL ? 'إرسال الطلب →' : 'Send request →'}
                    </button>
                  </>
                )}

                {state === 'confirmation' && (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: '#0F9D58',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 28,
                      margin: '0 auto 24px',
                    }}>
                      ✓
                    </div>
                    <h2 style={{ fontSize: 28, fontWeight: 500, color: '#0A1628', marginBottom: 12 }}>
                      {isRTL ? 'تم إرسال طلب العرض.' : 'Quote request sent.'}
                    </h2>
                    <p style={{ fontSize: 15, color: '#5B6B82', lineHeight: 1.6, marginBottom: 20, maxWidth: 400, margin: '0 auto 24px' }}>
                      {isRTL
                        ? 'عادة ما يستجيب المورد في غضون ٤ ساعات. سيتم إرسال عرض الأسعار إلى بريدك الإلكتروني.'
                        : 'The vendor typically responds within 4 hours. The quote will be sent to your email.'}
                    </p>
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 11,
                      color: '#94A3B8',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}>
                      {isRTL ? 'معرف الطلب: REQ-٢٠٢٦-٠٤-٢٧-A٨C٢' : 'Request ID: REQ-2026-04-27-A8C2'}
                    </div>
                    <button
                      onClick={() => setState('search')}
                      style={{
                        background: 'transparent',
                        border: '1px solid #E5E9F0',
                        color: '#0A1628',
                        borderRadius: 6,
                        padding: '10px 24px',
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: 'pointer',
                        marginTop: 24,
                      }}
                    >
                      {isRTL ? 'عودة إلى النتائج' : 'Back to results'}
                    </button>
                  </div>
                )}
              </div>

              <p style={{ color: '#0A1628', fontSize: 15, lineHeight: 1.6, marginTop: 20 }}>
                {isRTL
                  ? 'ثلاثة موردين متطابقين. بن حمزة هو الأقرب. هل تريد ملفهم الكامل؟'
                  : "Three vendors match. Bin Hamza is the closest fit. Want their full profile?"}
              </p>
            </div>
          </div>
        </div>

        {/* Caption */}
        <div style={{
          background: '#FAFBFC',
          borderTop: '1px solid #E5E9F0',
          padding: '12px 32px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          color: '#94A3B8',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}>
          FIG. 1 — FULL FOUR-STATE FLOW. SEARCH → PROFILE → QUOTE → CONFIRMATION.
        </div>
      </div>
    </div>
  );
}

export function YomaakCase() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#0A0A0A', color: '#F0EDE6', minHeight: '100vh' }}>
      <CaseNav title="Yomaak B2B" />

      {/* Content */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '104px 32px 96px' }}>
        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: '#444',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: 32,
          }}
        >
          CASE STUDY · SELF-INITIATED · APRIL 2026 · 3-DAY PROTOTYPE
        </motion.div>

        {/* Hero */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(56px, 7vw, 88px)',
            fontWeight: 400,
            letterSpacing: '0.01em',
            lineHeight: 1.0,
            color: '#F0EDE6',
            marginBottom: 32,
          }}
        >
          A B2B marketplace that lives{' '}
          <span style={{ color: '#0A5BFF' }}>inside</span>{' '}
          Claude.
        </motion.h1>

        {/* Deck */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: '#666',
            lineHeight: 1.55,
            maxWidth: 580,
            marginBottom: 48,
            fontFamily: 'Barlow Condensed, sans-serif',
            letterSpacing: '0.01em',
          }}
        >
          In January 2026, MCP Apps shipped. By April, every major SaaS was inside Claude.
          Almost all of them looked like dev demos. So I built one that didn't.
        </motion.p>

        {/* Credits */}
        <div style={{
          borderTop: '1px solid #1E1E1E',
          borderBottom: '1px solid #1E1E1E',
          padding: '32px 0',
          marginBottom: 96,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 24,
          }}>
            {[
              { label: 'Role', value: 'Solo design + prototype' },
              { label: 'Duration', value: '3 days, weekend build' },
              { label: 'Output', value: 'Working MCP App + design system' },
              { label: 'Stack', value: 'React, mcp-use, Claude Code' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 10,
                  color: '#444',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: 8,
                }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 15, fontWeight: 500, color: '#F0EDE6', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.02em', fontSize: 17 }}>
                  {item.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 1: Thesis */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 10,
            color: '#0A5BFF',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          01 / THESIS
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: '#F0EDE6',
            marginBottom: 32,
            fontFamily: 'Bebas Neue, sans-serif',
          }}
        >
          The medium is <span style={{ color: '#0A5BFF' }}>new</span>. Nobody knows what good looks like yet.
        </motion.h2>

        <div style={{ fontSize: 17, lineHeight: 1.65, color: '#666', marginBottom: 96, fontFamily: 'Inter, sans-serif' }}>
          <p style={{ marginBottom: 24 }}>
            MCP launched late 2024. The MCP Apps extension landed in January 2026. By April, every major SaaS had shipped inside Claude, ChatGPT, and Gemini. But most looked like 2008-iPhone-era dev demos because designers had not caught up yet.
          </p>
          <p style={{ marginBottom: 24 }}>
            The design challenge was not "make it pretty" — it was "figure out what should even exist." What is the right density? How much chrome? When do you break out of chat? What does a brand even mean when the canvas is conversational?
          </p>
          <p style={{ marginBottom: 32 }}>
            I wanted to find out what would happen if a designer started from the constraints and worked backward.
          </p>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ borderLeft: '3px solid #0A5BFF', paddingLeft: 24, marginBottom: 32 }}
          >
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 28, fontWeight: 400, color: '#F0EDE6', lineHeight: 1.4, margin: 0, letterSpacing: '0.01em' }}>
              "What does it look like when a designer — not an engineer — builds for the inside of a conversation?"
            </p>
          </motion.div>

          <p>
            I gave myself a weekend, a fictional brief, and a constraint I knew would force interesting decisions: build it for the Middle East market, in Arabic-first identity. RTL-by-default forces every layout decision to be re-examined.
          </p>
        </div>

        {/* Section 2: The Artifact */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 10,
            color: '#0A5BFF',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          02 / THE ARTIFACT
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: '#F0EDE6',
            marginBottom: 16,
            fontFamily: 'Bebas Neue, sans-serif',
          }}
        >
          Yomaak. <span style={{ color: '#0A5BFF' }}>Try it.</span>
        </motion.h2>

        <p style={{ fontSize: 17, lineHeight: 1.65, color: '#666', marginBottom: 48, fontFamily: 'Inter, sans-serif' }}>
          Below is the working prototype. The catalog is fictional but the interaction model is real — search, browse a vendor, request a quote, see confirmation. It mirrors how the widget would render inside a real Claude conversation.
        </p>
      </div>

      {/* Full-bleed prototype */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 96 }}
      >
        <YomaakPrototype />
      </motion.div>

      {/* Continue with article column */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 32px 96px' }}>
        {/* Section 3: The Flow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 10,
            color: '#0A5BFF',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          03 / THE FLOW
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: '#F0EDE6',
            marginBottom: 32,
            fontFamily: 'Bebas Neue, sans-serif',
          }}
        >
          One conversation. <span style={{ color: '#0A5BFF' }}>Four</span> states. No tabs.
        </motion.h2>

        <div style={{ fontSize: 17, lineHeight: 1.65, color: '#666', marginBottom: 96, fontFamily: 'Inter, sans-serif' }}>
          <p style={{ marginBottom: 24 }}>
            Every state lives inline. No redirects. No second login. The entire four-state journey — search, profile, quote form, confirmation — happens inside the conversation.
          </p>
          <p>
            The only moment that breaks out is final payment authorization. That's a deliberate trust boundary. Everything else stays in chat.
          </p>
        </div>

        {/* Section 4: The System */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 10,
            color: '#0A5BFF',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          04 / THE SYSTEM
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: '#F0EDE6',
            marginBottom: 32,
            fontFamily: 'Bebas Neue, sans-serif',
          }}
        >
          Behind every widget: a small <span style={{ color: '#0A5BFF' }}>alphabet</span> of primitives.
        </motion.h2>

        <div style={{ fontSize: 17, lineHeight: 1.65, color: '#666', marginBottom: 48, fontFamily: 'Inter, sans-serif' }}>
          <p style={{ marginBottom: 24 }}>
            The real architectural work was not building one vendor card. It was finding the smallest possible vocabulary — about 20 anatomical primitives like card, list-item-row, metric-strip, title-block, action-group — that compose into anything.
          </p>
          <p style={{ marginBottom: 48 }}>
            Same alphabet, different sentences.
          </p>
        </div>

        {/* Primitive recipe */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: '#141414',
            border: '1px solid #2A2A2A',
            borderRadius: 12,
            padding: '48px 40px',
            marginBottom: 96,
          }}
        >
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: '#999999',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 32,
          }}>
            VENDOR CARD · PRIMITIVE RECIPE
          </div>

          {/* Visual primitive breakdown */}
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 15, lineHeight: 2.2, marginBottom: 32 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: 8 }}>
              <span style={{
                background: '#F0EDE6',
                color: '#0A0A0A',
                padding: '6px 16px',
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 600,
              }}>
                card
              </span>
              <span style={{ color: '#F0EDE6' }}>→ contains</span>
              <span style={{
                background: '#F0EDE6',
                color: '#0A0A0A',
                padding: '6px 16px',
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 600,
              }}>
                hero-cover
              </span>
              <span style={{ color: '#F0EDE6' }}>+</span>
              <span style={{
                background: '#F0EDE6',
                color: '#0A0A0A',
                padding: '6px 16px',
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 600,
              }}>
                title-block
              </span>
              <span style={{ color: '#F0EDE6' }}>+</span>
              <span style={{
                background: '#F0EDE6',
                color: '#0A0A0A',
                padding: '6px 16px',
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 600,
              }}>
                metric-strip
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#F0EDE6' }}>(×3) +</span>
              <span style={{
                background: '#F0EDE6',
                color: '#0A0A0A',
                padding: '6px 16px',
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 600,
              }}>
                action-group
              </span>
              <span style={{ color: '#F0EDE6' }}>+</span>
              <span style={{
                background: '#F0EDE6',
                color: '#0A0A0A',
                padding: '6px 16px',
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 600,
              }}>
                status-pill
              </span>
              <span style={{ color: '#F0EDE6' }}>(×N)</span>
            </div>
          </div>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            lineHeight: 1.6,
            color: '#999',
            margin: 0,
          }}>
            This recipe is not unique to Yomaak B2B. The same primitives, in different arrangements, also produce a flight card, a hotel listing, a restaurant site, a podcast row. The thing that makes them Yomaak — or Turkish Airlines, or a roastery app — is not the component vocabulary. It is how the primitives map to brand tokens.
          </p>
        </motion.div>

        {/* Section 5: Principles */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 10,
            color: '#0A5BFF',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          05 / PRINCIPLES
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: '#F0EDE6',
            marginBottom: 48,
            fontFamily: 'Bebas Neue, sans-serif',
          }}
        >
          What <span style={{ color: '#0A5BFF' }}>does not</span> bend across clients.
        </motion.h2>

        <div style={{ marginBottom: 96 }}>
          {[
            {
              title: 'Inline, never modal',
              desc: 'Every state lives in the conversation. Auth and payment may pop out to verified surfaces, but anything that could happen in chat does happen in chat.',
            },
            {
              title: 'The trust moment is uncustomizable',
              desc: 'Confirmation states, payment summaries, contract previews, consent flows. Brands skin them. They do not redesign them.',
            },
            {
              title: 'RTL is a first-class citizen',
              desc: 'Every component ships with mirrored layouts, Arabic-Indic numerals, and bilingual typography mappings.',
            },
            {
              title: 'Three densities, no improvisation',
              desc: 'Compact, default, comfortable. Clients pick one. Components handle the rest.',
            },
            {
              title: 'Accessibility is the floor, not a feature',
              desc: 'WCAG AA contrast enforced at the token layer. Brands cannot ship a palette that fails.',
            },
          ].map((principle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr',
                gap: 24,
                padding: '32px 0',
                borderTop: i === 0 ? '1px solid #1E1E1E' : 'none',
                borderBottom: '1px solid #1E1E1E',
              }}
            >
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 12,
                color: '#333',
              }}>
                0{i + 1}
              </div>
              <div>
                <h3 style={{
                  fontSize: 22,
                  fontWeight: 400,
                  color: '#F0EDE6',
                  marginBottom: 12,
                  fontFamily: 'Bebas Neue, sans-serif',
                  letterSpacing: '0.02em',
                  fontSize: 24,
                }}>
                  {principle.title}
                </h3>
                <p style={{
                  fontSize: 15,
                  color: '#666',
                  lineHeight: 1.6,
                  margin: 0,
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {principle.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: '#0A1628',
            borderRadius: 12,
            padding: 56,
            marginBottom: 80,
          }}
        >
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: '#0A5BFF',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}>
            A NOTE ABOUT WHAT THIS IS
          </div>

          <h3 style={{
            fontSize: 32,
            fontWeight: 400,
            color: '#FAFBFC',
            marginBottom: 32,
            fontFamily: 'Inter, sans-serif',
          }}>
            It is a prototype. That is <span style={{ color: '#0A5BFF', fontWeight: 600 }}>the whole point.</span>
          </h3>

          <div style={{
            fontSize: 16,
            lineHeight: 1.65,
            color: 'rgba(250, 251, 252, 0.78)',
            fontFamily: 'Inter, sans-serif',
          }}>
            <p style={{ marginBottom: 24 }}>
              The Yomaak MCP App is not a real product. The vendors do not exist. The catalog is sample data. The quote button does not actually email anyone. I built it in three days, alone, on a weekend, because I wanted to think through a problem I find interesting — and the only way I know how to think about design is by building.
            </p>
            <p style={{ marginBottom: 24 }}>
              What is real: the design language, the system architecture, the primitive vocabulary, the bilingual identity, the four-state conversation flow, and the underlying question — what should AI-native commerce design feel like when a designer starts from the constraints?
            </p>
            <p style={{ marginBottom: 24 }}>
              That last question is the one I would want to spend the next year answering. Yomaak is the first sketch of an answer. Everything else — the polished case study, the working demo, the system spec, the principles — is just evidence that I am already inside the problem.
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #1E1E1E', paddingTop: 56 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 48,
            marginBottom: 56,
          }}>
            <div>
              <h4 style={{ fontSize: 22, fontWeight: 500, color: '#F0EDE6', marginBottom: 12, fontFamily: 'Inter, sans-serif' }}>
                Moustafa Abdelmoneim
              </h4>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6, margin: 0, fontFamily: 'Inter, sans-serif' }}>
                Multidisciplinary designer working across product, brand, and motion. Currently lead designer at a B2B marketplace startup. Based in Istanbul.
              </p>
            </div>
            <div>
              <h5 style={{
                fontSize: 11,
                fontFamily: 'JetBrains Mono, monospace',
                color: '#444',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}>
                Elsewhere
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Portfolio', onClick: () => navigate('/') },
                  { label: 'Email', href: 'mailto:hello@example.com' },
                  { label: 'LinkedIn', href: 'https://linkedin.com' },
                ].map((link) => (
                  link.onClick ? (
                    <button
                      key={link.label}
                      onClick={link.onClick}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#444',
                        fontSize: 14,
                        fontFamily: 'Inter, sans-serif',
                        textAlign: 'left',
                        cursor: 'pointer',
                        borderBottom: '1px solid transparent',
                        paddingBottom: 4,
                        transition: 'color 200ms ease, border-color 200ms ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#0A5BFF';
                        e.currentTarget.style.borderBottomColor = '#0A5BFF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#444';
                        e.currentTarget.style.borderBottomColor = 'transparent';
                      }}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#444',
                        fontSize: 14,
                        fontFamily: 'Inter, sans-serif',
                        textDecoration: 'none',
                        borderBottom: '1px solid transparent',
                        paddingBottom: 4,
                        display: 'inline-block',
                        transition: 'color 200ms ease, border-color 200ms ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#0A5BFF';
                        e.currentTarget.style.borderBottomColor = '#0A5BFF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#444';
                        e.currentTarget.style.borderBottomColor = 'transparent';
                      }}
                    >
                      {link.label}
                    </a>
                  )
                ))}
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            color: '#333',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            paddingTop: 24,
            borderTop: '1px solid #1E1E1E',
          }}>
            <span>YOMAAK · CASE STUDY · v0.1</span>
            <span>APRIL 2026 · ISTANBUL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
