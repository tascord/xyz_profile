<div align="center"> 
  <img src="https://github.com/tascord/xyz_profile/blob/main/images/example.png" alt="Preview" />
  
  <br>
  
  <h1> Xyz.Profile </h1>
  <h3> A landing page for you. </h3>
  
  <br>
  
  ---
  
</div>

<h2> How to use </h2>
<ol>
  <li>Clone the repo.</li>
  <li>Create a home page using the <a href="#customize">customizer</a>.</li>
  <li><a href="#import">Import</a> your data.</li>
  <li>Host!</li>
</ol>

---

<h2 id="customize"> The customizer </h2>
<p>
Within the index.html file, there exists a commented out line, <code>&lt;!-- <script src="scripts/customize.js" defer></script> --&gt;</code>.
In order to enable the customizer, this line must be uncommented, as well as the following line, <code><script src="scripts/data.js"></script></code>, must be commented out.

Now, when you open the site, you will be greeted with some default data as well as a customizer widget that will allow you to change things until they're to your liking.
Once you're happy with everything, click the 'Copy JSON Data' button, to copy the config file to your clipboard.

</p>

<h2 id="import"> Finalizing </h2>
<p>
Once your code from <a href="#customize">the customizer</a> is copied, you will now want to undo the edits you made to the index.html file.
Recommenting the customize.js line, and uncommenting the data.js line.

You will now want to paste your copied config file into the scripts/data.js file and, voilà!
</p>
