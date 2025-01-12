import FilterableTable from './FilterableTable'; 

function App() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex justify-center md:justify-start">
        <h1 className="text-2xl lg:text-3xl md:text-2xl font-extrabold text-center md:text-left text-black-600">
          Financial Data Filtering App
        </h1>
      </div>  
      <FilterableTable />
    </div>
  );
}

export default App;
