import type { InsightArticle } from "../types";

const crudeExportValues = [
  767.057, 737.15, 777, 661.498, 638.114, 622.787, 690.973, 665.663,
  626.01, 689.283, 704.531, 732.159, 760.042, 648.495, 713.754,
  676.835, 722.886, 687.265, 745.478, 711.196, 683.683, 715.25,
  732.686, 769.645, 769.724, 674.473, 752.681, 702.379, 745.951,
  708.283, 756.42, 739.889, 742.92, 737.646, 718.714, 722.335,
  781.178, 702.182, 747.919, 697.262, 767.323, 729.577, 748.037,
  755.161, 727.924, 778.934, 775.746, 799.126, 785.783, 749.808,
  805.739, 745.4, 799.992, 805.502, 827.229, 826.836, 770.433,
  821.561, 814.476, 839.903, 869.974, 766.536, 850.412, 765.04,
  827.662, 767.244, 823.057, 834.629, 812.823, 830.063, 833.566,
  856.08, 857.694, 795.741, 886.072, 852.144,
];

const crudeExports = crudeExportValues.map((value, index) => {
  const year = 2020 + Math.floor(index / 12);
  const month = String((index % 12) + 1).padStart(2, "0");
  return {
    label: `${year}-${month}`,
    value,
    display: `${value.toFixed(1)} PJ`,
  };
});

export const canadaEnergyBalance: InsightArticle = {
  slug: "canada-energy-balance-2020-2026",
  status: "published",
  category: "Visual story",
  kicker: "Canada · January 2020–April 2026",
  title: "Hydrocarbons power Canada’s energy expansion.",
  dek: "Primary energy production rose 17% from 2020 to 2025. Hydrocarbons supplied 103.7% of the net increase, while Canada’s net energy exports widened 26%.",
  publishedAt: "2026-07-30",
  readingMinutes: 8,
  methodology:
    "Monthly observations were aggregated into full calendar years for 2020–2025. Production totals combine the six primary-energy fuel categories and were validated against StatCan’s published Primary energy aggregate. Trade figures use Total primary and secondary energy, with net exports calculated as gross exports minus gross imports. The TMX comparison uses three matched 12-month periods: May 2023–April 2024, May 2024–April 2025, and May 2025–April 2026. Values were converted from terajoules to petajoules by dividing by 1,000. Monthly figures are not seasonally adjusted and remain subject to revision by Statistics Canada.",
  credit: "Built with the opendata.fyi MCP server.",
  blocks: [
    {
      type: "paragraph",
      text: "Canada produced 3,562 petajoules more primary energy in 2025 than in 2020. Nearly all of that expansion came from crude oil and natural gas. At the same time, the energy content exported from Canada grew much faster than the energy content imported, widening the country’s net export balance every year in the series.",
    },
    {
      type: "stat-grid",
      items: [
        {
          value: "12,326",
          unit: "PJ",
          label: "Net energy exports",
          note: "2025",
        },
        {
          value: "50.0%",
          label: "Crude oil share of production",
          note: "2025",
        },
        {
          value: "+17.0%",
          label: "Primary energy production",
          note: "2020 to 2025",
        },
      ],
    },
    {
      type: "note",
      text: "Unit note: A joule (J) is the standard unit of energy.\nDriving a gasoline car for one kilometre uses roughly 2–4 million joules of fuel energy, depending on the vehicle and driving conditions.\nOne petajoule (PJ) equals 1,000 TJ or 10¹⁵ J.",
    },
    {
      type: "heading",
      text: "1. Oil and gas supplied 103.7% of the net production gain.",
    },
    {
      type: "paragraph",
      text: "Primary energy production rose from 20,920 PJ in 2020 to 24,482 PJ in 2025. Crude oil added 2,019 PJ, natural gas added 1,461 PJ, and natural gas liquids added 214 PJ. Together those three categories contributed 3,694 PJ—103.7% of the net increase—because coal and primary electricity finished below their 2020 levels.",
    },
    {
      type: "stacked-bar-chart",
      title: "Crude oil and natural gas account for nearly all production growth",
      hideTitle: true,
      description:
        "Annual primary energy production by StatCan fuel category, 2020–2025.",
      unit: "Petajoules",
      series: [
        { key: "crude", label: "Crude oil", tone: "red" },
        { key: "gas", label: "Natural gas", tone: "ink" },
        { key: "coal", label: "Coal", tone: "slate" },
        { key: "ngl", label: "Natural gas liquids", tone: "blue" },
        {
          key: "electricity",
          label: "Primary electricity",
          tone: "sand",
        },
        { key: "renewable", label: "Renewable fuels", tone: "mist" },
      ],
      items: [
        {
          label: "2020",
          total: 20920.427,
          totalDisplay: "20,920 PJ",
          values: {
            crude: 10218.983,
            gas: 6788.296,
            coal: 1116.312,
            ngl: 891.531,
            electricity: 1851.185,
            renewable: 54.12,
          },
        },
        {
          label: "2021",
          total: 21895.784,
          totalDisplay: "21,896 PJ",
          values: {
            crude: 10838.326,
            gas: 7060.124,
            coal: 1220.202,
            ngl: 911.079,
            electricity: 1812.434,
            renewable: 53.619,
          },
        },
        {
          label: "2022",
          total: 22785.813,
          totalDisplay: "22,786 PJ",
          values: {
            crude: 11115.422,
            gas: 7578.138,
            coal: 1209.887,
            ngl: 968.383,
            electricity: 1861.38,
            renewable: 52.603,
          },
        },
        {
          label: "2023",
          total: 23118.473,
          totalDisplay: "23,118 PJ",
          values: {
            crude: 11271.995,
            gas: 7800.781,
            coal: 1257.684,
            ngl: 971.995,
            electricity: 1757.934,
            renewable: 58.084,
          },
        },
        {
          label: "2024",
          total: 23704.881,
          totalDisplay: "23,705 PJ",
          values: {
            crude: 11762.698,
            gas: 7978.835,
            coal: 1131.307,
            ngl: 1042.115,
            electricity: 1709.723,
            renewable: 80.203,
          },
        },
        {
          label: "2025",
          total: 24482.247,
          totalDisplay: "24,482 PJ",
          values: {
            crude: 12238.243,
            gas: 8249.086,
            coal: 1075.498,
            ngl: 1105.681,
            electricity: 1734.422,
            renewable: 79.317,
          },
        },
      ],
      note: "Primary electricity combines hydro, nuclear, wind, tidal, solar and other generation. Renewable fuels covers fuel ethanol, biodiesel and renewable diesel.",
    },
    {
      type: "paragraph",
      text: "Crude oil production grew 19.8% and represented exactly half of primary production in 2025. Natural gas grew 21.5%. Primary electricity declined 6.3%, while renewable fuels rose 46.6% from a very small base—adding only 25 PJ across the five years.",
    },
    {
      type: "heading",
      text: "2. Energy exports grew four times faster than imports.",
    },
    {
      type: "paragraph",
      text: "Gross exports of primary and secondary energy rose from 13,398 PJ in 2020 to 16,179 PJ in 2025, an increase of 20.8%. Imports rose only 5.8%, from 3,641 PJ to 3,853 PJ. The difference between the two—the net export balance—therefore widened 26.3% to 12,326 PJ.",
    },
    {
      type: "grouped-bar-chart",
      title: "Energy exports grew four times faster than imports",
      hideTitle: true,
      description:
        "Annual gross exports and imports of total primary and secondary energy.",
      unit: "Petajoules",
      series: [
        { key: "exports", label: "Exports", tone: "red" },
        { key: "imports", label: "Imports", tone: "mist" },
      ],
      items: [
        {
          label: "2020",
          values: { exports: 13397.921, imports: 3641.061 },
          displays: { exports: "13,398", imports: "3,641" },
          annotation: "Net +9,757",
        },
        {
          label: "2021",
          values: { exports: 14123.366, imports: 3700.123 },
          displays: { exports: "14,123", imports: "3,700" },
          annotation: "Net +10,423",
        },
        {
          label: "2022",
          values: { exports: 14689.325, imports: 3785.18 },
          displays: { exports: "14,689", imports: "3,785" },
          annotation: "Net +10,904",
        },
        {
          label: "2023",
          values: { exports: 14886.745, imports: 3788.938 },
          displays: { exports: "14,887", imports: "3,789" },
          annotation: "Net +11,098",
        },
        {
          label: "2024",
          values: { exports: 15634.567, imports: 3779.702 },
          displays: { exports: "15,635", imports: "3,780" },
          annotation: "Net +11,855",
        },
        {
          label: "2025",
          values: { exports: 16178.888, imports: 3852.78 },
          displays: { exports: "16,179", imports: "3,853" },
          annotation: "Net +12,326",
        },
      ],
      note: "In 2025, gross exports were 4.2 times imports. The 12,326 PJ net balance is the difference between them and should not itself be described as 4.2 times imports.",
    },
    {
      type: "heading",
      text: "3. TMX expansion and crude exports.",
    },
    {
      type: "paragraph",
      text: "TMX entered commercial service on May 1, 2024. Average monthly crude exports were 764 PJ in the 12 months before and 813 PJ in the 12 months after—a 6.4% increase.",
    },
    {
      type: "line-chart",
      title: "Monthly crude oil exports",
      hideTitle: true,
      description:
        "All Canadian crude oil exports by energy content, January 2020–April 2026.",
      unit: "Petajoules per month",
      items: crudeExports,
      event: {
        at: "2024-05",
        label: "TMX service begins",
      },
      note: "March 2026 is the series high at 886.1 PJ. January 2026 was not a record; January 2025 was higher.",
    },
    {
      type: "callout",
      label: "Association is not attribution",
      text: "This StatCan series covers every crude export route and does not report TMX throughput. The timing is consistent with new pipeline capacity, but production growth, demand, maintenance and other transport routes also affect exports. The table alone cannot assign the full increase to TMX.",
    },
    {
      type: "heading",
      text: "4. Coal production fell after peaking in 2023.",
    },
    {
      type: "paragraph",
      text: "Coal production reached 1,258 PJ in 2023 before falling to 1,075 PJ in 2025, a 14.5% decline from that peak and 3.7% below 2020. The latest 12 months through April 2026 totalled approximately 1,039 PJ, 6.9% below 2020. That is a recent decline, but the six annual observations are volatile rather than a smooth phase-out path.",
    },
    {
      type: "bar-chart",
      title: "Coal production peaked in 2023, then fell for two years",
      hideTitle: true,
      description:
        "Annual production across all coal types in the consolidated energy table.",
      unit: "Petajoules",
      items: [
        { label: "2020", value: 1116.312, display: "1,116" },
        { label: "2021", value: 1220.202, display: "1,220" },
        { label: "2022", value: 1209.887, display: "1,210" },
        { label: "2023", value: 1257.684, display: "1,258", highlight: true },
        { label: "2024", value: 1131.307, display: "1,131" },
        { label: "2025", value: 1075.498, display: "1,075" },
      ],
      note: "The StatCan category sums bituminous, sub-bituminous, lignite and anthracite coal.",
    },
    {
      type: "paragraph",
      text: "These figures measure coal produced, not coal burned to generate electricity. They combine thermal and metallurgical coal, so they cannot show whether coal-fired power is being phased out.",
    },
  ],
  sources: [
    {
      title: "Consolidated Energy Statistics, Table 25-10-0079-01",
      publisher: "Statistics Canada",
      url: "https://doi.org/10.25318/2510007901-eng",
      accessed: "2026-07-30",
    },
    {
      title: "Consolidated Energy Statistics Table: User Guide",
      publisher: "Statistics Canada",
      url: "https://www150.statcan.gc.ca/n1/pub/25-26-0002/252600022023001-eng.htm",
      accessed: "2026-07-30",
    },
    {
      title:
        "Trans Mountain Announces Milestones of Commercial Service for Expanded System",
      publisher: "Trans Mountain Corporation",
      url: "https://www.transmountain.com/news/trans-mountain-announces-milestones-of-commercial-service-for-expanded-system",
      accessed: "2026-07-30",
    },
    {
      title:
        "Regulations Amending the Reduction of Carbon Dioxide Emissions from Coal-fired Generation of Electricity Regulations",
      publisher: "Environment and Climate Change Canada",
      url: "https://pollution-waste.canada.ca/environmental-protection-registry/regulations/view?Id=152",
      accessed: "2026-07-30",
    },
    {
      title: "EnerGuide label for battery-electric vehicles",
      publisher: "Natural Resources Canada",
      url: "https://natural-resources.canada.ca/energy-efficiency/product-energy-ratings/energuide/energuide-label-battery-electric-vehicles",
      accessed: "2026-07-30",
    },
    {
      title: "Factors that affect fuel efficiency",
      publisher: "Natural Resources Canada",
      url: "https://natural-resources.canada.ca/energy-efficiency/transportation-energy-efficiency/personal-vehicles/factors-affect-fuel-efficiency",
      accessed: "2026-07-30",
    },
  ],
};
